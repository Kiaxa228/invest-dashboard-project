
import sqlalchemy
from sqlalchemy import orm, Column, VARCHAR, ForeignKey, INTEGER
from .db_session import Base

class Profile(Base):
    __tablename__ = 'Profile'

    profile_id = Column(VARCHAR(200), primary_key=True, nullable=False)
    username = Column(VARCHAR(200), ForeignKey('User.username'),
                      nullable=False)
    balance = Column(INTEGER, default=0)
    investment = Column(INTEGER, default=0)
    dollars = Column(INTEGER, default=0)
    euro = Column(INTEGER, default=0)
    yuan = Column(INTEGER, default=0)
    bitcoin = Column(INTEGER, default=0)

    user = orm.relationship('User', back_populates='profile')

    def __repr__(self):
        return (f'<Profile> {self.profile_id} {self.username} {self.balance} '
                f'{self.investment}')
