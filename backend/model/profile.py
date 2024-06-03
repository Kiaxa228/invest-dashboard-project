
import sqlalchemy
from sqlalchemy import orm, Column, VARCHAR, ForeignKey, FLOAT, INTEGER
from .db_session import Base

class Profile(Base):
    __tablename__ = 'Profile'

    profile_id = Column(INTEGER, primary_key=True, nullable=False,
                        autoincrement=True)
    username = Column(VARCHAR(200), ForeignKey('User.username'),
                      nullable=False)
    balance = Column(FLOAT, default=0)
    dollars = Column(FLOAT, default=0)
    euro = Column(FLOAT, default=0)
    yuan = Column(FLOAT, default=0)

    user = orm.relationship('User', back_populates='profile')
