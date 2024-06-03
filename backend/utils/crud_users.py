from backend.model.users import User
from backend.model.profile import Profile
from backend.model.model_dto import RegisterData


def create_user(data: RegisterData, session):
    if session.query(User).filter_by(username=data.username).one_or_none() is not None:
        return False
    user = User()

    user.username = data.username
    user.password = data.password
    session.add(user)
    session.commit()
    return data


def delete_user(data: RegisterData, session):
    user = session.query(User).filter_by(username=data.username).one_or_none()
    if user is None:
        return False
    profile = session.query(Profile).filter_by(username=data.username).one_or_none()
    if profile is not None:
        session.delete(profile)

    session.delete(user)
    session.commit()

    return True


def validate_user(data: RegisterData, session):
    user = session.query(User).filter_by(username=data.username).one_or_none()
    if not user:
        return False
    if user.password != data.password:
        return False

    return True

