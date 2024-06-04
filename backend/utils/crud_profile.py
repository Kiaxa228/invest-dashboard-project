from backend.model.profile import Profile
from backend.model.model_dto import ProfileDto


def add_profile(data: ProfileDto, session):
    if data.username is None:
        return False

    if session.query(Profile).filter_by(
            username=data.username).one_or_none() is not None:
        return False

    profile = Profile()

    profile.username = data.username
    profile.balance = data.balance
    profile.dollars = data.dollars
    profile.euro = data.euro
    profile.yuan = data.yuan


    session.add(profile)
    session.commit()

    profile = session.query(Profile).filter_by(
        username=data.username).one_or_none()
    data.profile_id = profile.profile_id

    return data


def update_profile(data: ProfileDto, session):
    profile = session.query(Profile).filter_by(
        username=data.username).one_or_none()

    if profile is None:
        return False

    profile.balance = data.balance
    profile.dollars = data.dollars
    profile.euro = data.euro
    profile.yuan = data.yuan

    session.commit()

    return True


def delete_profile(data: ProfileDto, session):
    profile = session.query(Profile).filter_by(
        username=data.username).one_or_none()

    if profile is None:
        return False

    session.delete(profile)
    session.commit()

    return True


def get_profile(username, session):
    profile = session.query(Profile).filter_by(
        username=username).one_or_none()
    return profile
