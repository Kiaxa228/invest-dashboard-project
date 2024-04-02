from data import db_session
from data.users import User
from data.portfolio import Portfolio
from data.currencies import Currencies


def main():
    print("Hello World!")


if __name__ == '__main__':
    main()
    db_session.global_init('testdb')

    db_sess = db_session.create_session()

    user = User()
    user.name = 'Ilya'
    user.email = '<EMAIL>'
    user.hashed_password = '<PASSWORD>'

    db_sess.add(user)
    db_sess.commit()

    for user in db_sess.query(User).all():
        print(user)

    currency = Currencies()
    currency.name = 'USD'
    currency.rate = 100

    db_sess.add(currency)
    db_sess.commit()

    for currency in db_sess.query(Currencies).all():
        print(currency)

    portfolio = Portfolio()
    portfolio.currency_id = db_sess.query(Currencies).first().id
    portfolio.user_id = db_sess.query(User).first().id
    portfolio.count_of_currency = 10
    db_sess.add(portfolio)
    db_sess.commit()

    for port in db_sess.query(Portfolio).all():
        print(port)

    db_sess.close()
