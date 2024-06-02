from sqlalchemy import Column, VARCHAR
from .db_session import Base


class CurrenciesData(Base):
    __tablename__ = "CurrenciesData"
    name = Column(VARCHAR, nullable=False)
    figi = Column(VARCHAR, nullable=False)
    ticker = Column(VARCHAR, nullable=False)
    currency = Column(VARCHAR, nullable=False)
    uid = Column(VARCHAR, primary_key=True, nullable=False)
    logoName = Column(VARCHAR, nullable=False)
