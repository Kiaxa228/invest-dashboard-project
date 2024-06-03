import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.orm import Session
import sqlalchemy.ext.declarative as dec
import json

Base = dec.declarative_base()

__factory = None


def global_init():
    global __factory

    if __factory:
        return

    with open('D:\\pythonProjects\\invest-dashboard1\\backend\\utils\\config.json', 'r') as f:
        config = json.load(f)
        db_source = config['test_source']

    engine = sa.create_engine(f'postgresql://postgres:postgres@localhost:5432/postgres', echo=False)

    Base.metadata.drop_all(engine)

    __factory = orm.sessionmaker(bind=engine)

    from . import __all_models

    Base.metadata.create_all(engine)


def create_session() -> Session:
    global __factory
    return __factory()
