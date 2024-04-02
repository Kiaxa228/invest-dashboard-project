from data import db_session
from data.users import User


def main():
    print("Hello World!")


if __name__ == '__main__':
    main()
    db_session.global_init('testdb')

    db_sess = db_session.create_session()

    print(db_sess.query(User).first().name)
    db_sess.close()
