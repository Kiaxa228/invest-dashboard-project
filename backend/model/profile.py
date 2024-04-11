from sqlalchemy import orm, Column, VARCHAR, DOUBLE, ForeignKey, Integer
from .db_session import Base


class Profile(Base):
    __tablename__ = 'Profile'

    profile_id = Column(Integer, primary_key=True, nullable=False,
                        autoincrement=True)
    username = Column(VARCHAR(200), ForeignKey('User.username'),
                      nullable=False, unique=True)
    balance = Column(DOUBLE)
    investment = Column(DOUBLE)
    dollars = Column(DOUBLE)
    euro = Column(DOUBLE)
    yuan = Column(DOUBLE)
    bitcoin = Column(DOUBLE)

    user = orm.relationship('User', back_populates='profile')

    def __repr__(self):
        return (f'<Profile> {self.profile_id} {self.username} {self.balance} '
                f'{self.investment}')
