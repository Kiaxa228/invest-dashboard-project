import sqlalchemy
from sqlalchemy import orm
from .db_session import Base


class Portfolio(Base):
    __tablename__ = 'portfolio'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True,
                           autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer,
                                sqlalchemy.ForeignKey('users.id'))
    currency_id = sqlalchemy.Column(sqlalchemy.Integer,
                                    sqlalchemy.ForeignKey('currencies.id'))
    count_of_currency = sqlalchemy.Column(sqlalchemy.Integer)

    user = orm.relationship('User', back_populates='portfolio')
    currency = orm.relationship('Currencies',
                                back_populates='portfolio')

    def __repr__(self):
        return (f'<Portfolio> {self.user_id} {self.currency_id} '
                f'{self.count_of_currency}')
