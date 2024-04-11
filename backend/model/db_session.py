import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.orm import Session
import sqlalchemy.ext.declarative as dec

Base = dec.declarative_base()

__factory = None


def global_init(db_name):
    global __factory

    if __factory:
        return

    if not db_name or not db_name.strip:
        raise ValueError('Name of database is empty')

    engine = sa.create_engine(
        f'postgresql://185.127.225.251:karasik_sanichka2003@'
        f'karasik_sanichka2004:5440/karasik_db', echo=False)
    # Удалить, когда будет окончательная версия БД
    # Эта строка очищает БД
    Base.metadata.drop_all(engine)

    __factory = orm.sessionmaker(bind=engine)

    from . import __all_models

    Base.metadata.create_all(engine)


def create_session() -> Session:
    global __factory
    return __factory()
