import sqlalchemy
from sqlalchemy import orm
from datetime import datetime
from .db_session import Base


class User(Base):
    __tablename__ = 'users'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True,
                           autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    email = sqlalchemy.Column(sqlalchemy.String, nullable=False, unique=True)
    hashed_password = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    created_at = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now())

    portfolio = orm.relationship('Portfolio', back_populates='user')

    def __repr__(self):
        return f'<User> {self.name} {self.email}'
