import sqlalchemy
from sqlalchemy import orm, Column, VARCHAR, DOUBLE, ForeignKey
from .db_session import Base


class Profile(Base):
    __tablename__ = 'Profile'

    profile_id = Column(VARCHAR(200), primary_key=True, nullable=False)
    username = Column(VARCHAR(200), ForeignKey('User.username'),
                      nullable=False)
    balance = Column(DOUBLE, default=0)
    investment = Column(DOUBLE, default=0)
    dollars = Column(DOUBLE, default=0)
    euro = Column(DOUBLE, default=0)
    yuan = Column(DOUBLE, default=0)
    bitcoin = Column(DOUBLE, default=0)

    user = orm.relationship('User', back_populates='profile')

    def __repr__(self):
        return (f'<Profile> {self.profile_id} {self.username} {self.balance} '
                f'{self.investment}')
