from pydantic import BaseModel
from sqlalchemy import orm, Column, VARCHAR, DECIMAL, ForeignKey, Integer
from .db_session import Base


class Profile(Base):
    __tablename__ = 'profile'

    profile_id = Column(Integer, primary_key=True, nullable=False,
                        autoincrement=True)
    username = Column(VARCHAR(200), ForeignKey('User.username'),
                      nullable=False, unique=True)
    balance = Column(DECIMAL, default=0)
    investment = Column(DECIMAL, default=0)
    dollars = Column(DECIMAL, default=0)
    euro = Column(DECIMAL, default=0)
    yuan = Column(DECIMAL, default=0)
    bitcoin = Column(DECIMAL, default=0)

    user = orm.relationship('User', back_populates='profile')

    def __repr__(self):
        return (f'<Profile> {self.profile_id} {self.username} {self.balance} '
                f'{self.investment}')
