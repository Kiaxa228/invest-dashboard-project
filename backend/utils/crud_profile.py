from backend.model.profile import Profile
from backend.model.db_session import create_session


def add_profile(username, balance=0, investment=0, dollars=0, euro=0, yuan=0,
                bitcoin=0):
    profile = Profile()
    session = create_session()

    try:
        profile.username = username
        profile.balance = balance
        profile.investment = investment
        profile.dollars = dollars
        profile.euro = euro
        profile.yuan = yuan
        profile.bitcoin = bitcoin

        session.add(profile)
        session.commit()
    except Exception:
        return f'{username} already has a profile'

    session.close()
    return 'Success'


def delete_profile(username=None, profile_id=None):
    session = create_session()
    if username is not None:
        try:
            profile = session.query(Profile).filter(
                Profile.username == username).first()
            session.delete(profile)
            session.commit()
        except Exception:
            return f'ERROR: No profile profile was found for {username}'
    elif profile_id is not None:
        try:
            profile = session.query(Profile).filter(
                Profile.profile_id == profile_id).first()
            session.delete(profile)
            session.commit()
        except Exception:
            return f'ERROR: No profile profile was found with id {profile_id}'

    session.close()
    return 'Success'


def update_profile(username=None, profile_id=None, balance=None,
                   investment=None, dollars=None, euro=None, yuan=None,
                   bitcoin=None):
    session = create_session()

    if username is not None:
        try:
            profile = session.query(Profile).filter(
                Profile.username == username).first()
            if not profile:
                raise Exception
        except Exception:
            return f'ERROR: No profile profile was found for {username}'
    elif profile_id is not None:
        try:
            profile = session.query(Profile).filter(
                Profile.profile_id == profile_id).first()
            if not profile:
                raise Exception
        except Exception:
            return f'ERROR: No profile profile was found with id {profile_id}'

    if balance is not None:
        profile.balance = balance
    if investment is not None:
        profile.investment = investment
    if dollars is not None:
        profile.dollars = dollars
    if euro is not None:
        profile.euro = euro
    if yuan is not None:
        profile.yuan = yuan
    if bitcoin is not None:
        profile.bitcoin = bitcoin
    session.commit()
    return 'Success'
