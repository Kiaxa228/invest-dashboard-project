from fastapi import APIRouter, Response
from backend.utils.crud_profile import get_profile, update_profile
from backend.model.db_session import create_session
from backend.model.profile_controller_models import BuySellFilterValues
from backend.model.model_dto import ProfileDto
import requests
from backend.model.model_dto import RegisterData
import json

profile_router = APIRouter()

import xml.etree.ElementTree as ET


def get_exchange_rate_from_cbr(ticker):
    base_url = 'https://www.cbr.ru/scripts/XML_daily.asp'

    try:
        response = requests.get(base_url)
        response.raise_for_status()
        tree = ET.ElementTree(ET.fromstring(response.content))
        root = tree.getroot()

        if ticker[:3] == 'RUB':
            base_currency = ticker[3:]
            target_currency = 'RUB'
        else:
            base_currency = ticker[:3]
            target_currency = ticker[3:]

        rate = None
        for currency in root.findall('Valute'):
            char_code = currency.find('CharCode').text
            if char_code == base_currency:
                nominal = int(currency.find('Nominal').text)
                value = float(currency.find('Value').text.replace(',', '.'))
                if target_currency == 'RUB':
                    rate = value / nominal
                else:
                    rate = nominal / value
                break

        if rate:
            return rate
        else:
            return f"Ошибка: Валюта {ticker} не найдена"
    except requests.exceptions.RequestException as e:
        return f"Ошибка запроса: {e}"


@profile_router.post('/get')
async def get_profil(profile_data: RegisterData):
    print(profile_data)
    session = create_session()
    profile = get_profile(profile_data.username, session)
    session.close()
    profile_data = ProfileDto(username=profile.username,
                              balance=profile.balance, dollars=profile.dollars,
                              euro=profile.euro, yuan=profile.yuan)
    if profile is None:
        return Response('Incorrect username', status_code=401)
    print(profile_data)
    return json.dumps({'username': profile_data.username, 'balance': profile_data.balance,
            'dollars': profile_data.dollars, 'euro': profile_data.euro,
            'yuan': profile_data.yuan})


@profile_router.post('/buy')
async def buy(data: BuySellFilterValues):
    session = create_session()
    profile = get_profile(data.username, session)

    profile_data = ProfileDto(profile_id=profile.profile_id,
                              username=profile.username,
                              balance=profile.balance, dollars=profile.dollars,
                              euro=profile.euro, yuan=profile.yuan)
    if profile is None:
        session.close()
        return Response('Incorrect username', status_code=401)
    if data.currency == 'USD':
        rate = get_exchange_rate_from_cbr('USDRUB')
        if profile_data.balance - rate * data.value < 0:
            return Response('Incorrect currency', status_code=401)

        profile_data.balance -= rate * data.value
        profile_data.dollars += data.value

        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'dollars': profile_data.dollars}
    if data.currency == 'EUR':
        rate = get_exchange_rate_from_cbr('EURRUB')
        if profile_data.balance - rate * data.value < 0:
            session.close()
            return Response('Incorrect currency', status_code=401)

        profile_data.balance -= rate * data.value
        profile_data.euro += data.value

        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'euro': profile_data.euro}
    if data.currency == 'CNY':
        rate = get_exchange_rate_from_cbr('CNYRUB')
        if profile_data.balance - rate * data.value < 0:
            session.close()
            return Response('Incorrect currency', status_code=401)

        profile_data.balance -= rate * data.value
        profile_data.yuan += data.value
        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'yuan': profile_data.yuan}


@profile_router.post('/sell')
async def sell(data: BuySellFilterValues):
    session = create_session()
    profile = get_profile(data.username, session)

    profile_data = ProfileDto(profile_id=profile.profile_id,
                              username=profile.username,
                              balance=profile.balance, dollars=profile.dollars,
                              euro=profile.euro, yuan=profile.yuan)
    if profile is None:
        session.close()
        return Response('Incorrect username', status_code=401)
    if data.currency == 'USD':
        rate = get_exchange_rate_from_cbr('USDRUB')
        if profile_data.dollars - data.value < 0:
            return Response('Incorrect currency', status_code=401)

        profile_data.balance += rate * data.value
        profile_data.dollars -= data.value

        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'dollars': profile_data.dollars}
    if data.currency == 'EUR':
        rate = get_exchange_rate_from_cbr('EURRUB')
        if profile_data.euro - data.value < 0:
            session.close()
            return Response('Incorrect currency', status_code=401)

        profile_data.balance += rate * data.value
        profile_data.euro -= data.value

        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'euro': profile_data.euro}
    if data.currency == 'CNY':
        rate = get_exchange_rate_from_cbr('CNYRUB')
        if profile_data.yuan - data.value < 0:
            session.close()
            return Response('Incorrect currency', status_code=401)

        profile_data.balance += rate * data.value
        profile_data.yuan -= data.value
        update_profile(profile_data, session)
        session.close()
        return {'username': profile_data.username,
                'balance': profile_data.balance,
                'yuan': profile_data.yuan}
