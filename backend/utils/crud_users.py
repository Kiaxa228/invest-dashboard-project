from backend.model.users import User
from backend.model.profile import Profile
from backend.model.db_session import create_session


def create_user(username, password):
    user = User()
    user.username = username
    user.password = password
    session = create_session()
    session.add(user)
    session.commit()


def delete_user(username):
    session = create_session()

    try:
        profile = session.query(Profile).filter_by(username=Profile.username == username).first()
        session.delete(profile)
        session.commit()
    except Exception:
        return f"ERROR: No profile found for {username}"

    try:
        user = session.query(User).filter(User.username == username).first()
        session.delete(user)
        session.commit()
    except Exception:
        return f"ERROR: there is no user {username}"
    return "Success"
