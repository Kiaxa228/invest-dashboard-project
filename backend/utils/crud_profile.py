from backend.model.profile import Profile
from backend.model.model_dto import ProfileDto


def add_profile(data: ProfileDto, session):
    if session.query(Profile).filter_by(
            username=ProfileDto.username).one_or_none() is not None:
        return False

    profile = Profile()

    profile.username = ProfileDto.username
    profile.balance = ProfileDto.balance
    profile.investment = ProfileDto.investment
    profile.dollars = ProfileDto.dollars
    profile.euro = ProfileDto.euro
    profile.yuan = ProfileDto.yuan
    profile.bitcoin = ProfileDto.bitcoin

    session.add(profile)
    session.commit()

    profile = session.query(Profile).filter_by(
        username=ProfileDto.username).one_or_none()
    ProfileDto.price = profile.profile_id

    return ProfileDto


def update_profile(data: ProfileDto, session):
    profile = session.query(Profile).filter_by(
        username=ProfileDto.username).one_or_none()

    if profile is None:
        return False

    profile.balance = ProfileDto.balance
    profile.investment = ProfileDto.investment
    profile.dollars = ProfileDto.dollars
    profile.euro = ProfileDto.euro
    profile.yuan = ProfileDto.yuan
    profile.bitcoin = ProfileDto.bitcoin

    session.commit()

    return True


def delete_profile(data: ProfileDto, session):
    profile = session.query(Profile).filter_by(
        username=ProfileDto.username).one_or_none()

    if profile is None:
        return False

    session.delete(profile)
    session.commit()

    return True
