import sqlalchemy
from sqlalchemy import orm
from .db_session import Base


class Currencies(Base):
    __tablename__ = 'currencies'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True,
                           autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String, nullable=False, unique=True)
    rate = sqlalchemy.Column(sqlalchemy.Integer, default=1)

    portfolio = orm.relationship('Portfolio',
                                 back_populates='currency')

    def __repr__(self):
        return f'<Currency> {self.name} {self.rate}'
