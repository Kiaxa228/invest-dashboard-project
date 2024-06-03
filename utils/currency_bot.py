import telebot
from telebot import types
import requests
import schedule
import time
import threading
from datetime import datetime
import xml.etree.ElementTree as ET

API_TOKEN = '7251174097:AAFh6svV6xQx69ejxlxprPo9mPk8qADmjIA'
bot = telebot.TeleBot(API_TOKEN)

user_data = {}

def get_exchange_rate_cbr(currency_code):
    try:
        url = 'https://www.cbr.ru/scripts/XML_daily.asp'
        response = requests.get(url)
        response.raise_for_status()
        data = ET.fromstring(response.content)
        for currency in data.findall('Valute'):
            char_code = currency.find('CharCode').text
            if char_code == currency_code:
                return float(currency.find('Value').text.replace(',', '.'))
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from CBR: {e}")
        return None

def get_bitcoin_rate():
    try:
        url = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data['bpi']['USD']['rate_float']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from CoinDesk: {e}")
        return None

def create_main_menu():
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
    keyboard.add(types.KeyboardButton("Валюты"), types.KeyboardButton("Показать мои Валюты"))
    return keyboard

def create_currency_keyboard(chat_id):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
    currencies = ['USD', 'EUR', 'CNY', 'BTC']
    buttons = []
    for currency in currencies:
        text = currency
        if currency in user_data.get(chat_id, {}).get('currencies', []):
            text += " ✅"
        buttons.append(types.KeyboardButton(text))
    keyboard.add(*buttons)
    keyboard.add(types.KeyboardButton("Продолжить"))
    return keyboard

@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    user_data[chat_id] = {'currencies': [], 'time': None}
    bot.send_message(chat_id, "Добро пожаловать! Выберите категорию:", reply_markup=create_main_menu())

@bot.message_handler(func=lambda message: message.text in ["Валюты", "Показать мои Валюты", "Продолжить"])
def menu_handler(message):
    chat_id = message.chat.id
    text = message.text

    if text == "Валюты":
        bot.send_message(chat_id, "Выберите валюты:", reply_markup=create_currency_keyboard(chat_id))
    elif text == "Показать мои Валюты":
        if not user_data[chat_id]['currencies']:
            bot.send_message(chat_id, "У вас нет выбранных валют.", reply_markup=create_main_menu())
        else:
            currencies = ', '.join(user_data[chat_id]['currencies'])
            bot.send_message(chat_id, f"Ваши валюты: {currencies}", reply_markup=create_main_menu())
    elif text == "Продолжить":
        if user_data[chat_id]['currencies']:
            bot.send_message(chat_id, "Введите время уведомления в формате HH:MM:")
            bot.register_next_step_handler(message, handle_custom_time)
        else:
            bot.send_message(chat_id, "Пожалуйста, выберите хотя бы одну валюту.", reply_markup=create_currency_keyboard(chat_id))

@bot.message_handler(func=lambda message: any(currency in message.text for currency in ['USD', 'EUR', 'CNY', 'BTC']))
def currency_handler(message):
    chat_id = message.chat.id
    if chat_id not in user_data:
        user_data[chat_id] = {'currencies': [], 'time': None}
    currency = message.text.replace(" ✅", "")
    if currency in user_data[chat_id]['currencies']:
        user_data[chat_id]['currencies'].remove(currency)
    else:
        user_data[chat_id]['currencies'].append(currency)
    bot.send_message(chat_id, "Выберите валюты:", reply_markup=create_currency_keyboard(chat_id))

def handle_custom_time(message):
    chat_id = message.chat.id
    try:
        notification_time = message.text.strip()
        datetime.strptime(notification_time, '%H:%M')
        user_data[chat_id]['time'] = notification_time
        bot.send_message(chat_id, f"Время уведомления установлено на {notification_time}. Настройки успешно сохранены.", reply_markup=create_main_menu())
    except ValueError:
        bot.send_message(chat_id, "Неверный формат. Введите время в формате HH:MM.")
        bot.register_next_step_handler(message, handle_custom_time)

def send_notifications():
    current_time = datetime.now().strftime('%H:%M')
    for chat_id, data in user_data.items():
        if data['time'] and current_time == data['time']:
            messages = []
            for currency in data['currencies']:
                if currency in ['USD', 'EUR', 'CNY']:
                    rate = get_exchange_rate_cbr(currency)
                    currency_text = f"{currency}: {rate:.2f} RUB" if rate else f"Ошибка при получении курса {currency}."
                elif currency == 'BTC':
                    usd_rate = get_bitcoin_rate()
                    if usd_rate:
                        rub_rate = get_exchange_rate_cbr('USD')
                        if rub_rate:
                            rate_rub = usd_rate * rub_rate
                            currency_text = f"{currency}: {usd_rate:.2f} USD"
                        else:
                            currency_text = f"{currency}: {usd_rate:.2f} USD, ошибка при получении курса RUB."
                    else:
                        currency_text = f"Ошибка при получении курса BTC."
                messages.append(currency_text)
            bot.send_message(chat_id, "\n".join(messages))

def schedule_notifications():
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    schedule.every().minute.do(send_notifications)
    scheduler_thread = threading.Thread(target=schedule_notifications)
    scheduler_thread.start()
    bot.polling()
