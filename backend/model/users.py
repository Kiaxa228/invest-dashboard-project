from sqlalchemy import orm, Column, VARCHAR
from .db_session import Base


class User(Base):
    __tablename__ = 'User'

    username = Column(VARCHAR, primary_key=True, nullable=False)
    password = Column(VARCHAR, nullable=False)

    profile = orm.relationship('Profile', back_populates='user')
