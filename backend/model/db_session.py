import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.orm import Session
import sqlalchemy.ext.declarative as dec
import json
import sys, os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

Base = dec.declarative_base()

__factory = None


def global_init():
    global __factory

    if __factory:
        return

    with open(os.path.join(BASE_DIR, 'Files', '../utils/config.json'),
              'r') as f:
        config = json.load(f)
        db_source = config['test_source']

    engine = sa.create_engine(db_source, echo=False)

#     Base.metadata.drop_all(engine)

    __factory = orm.sessionmaker(bind=engine)

    from . import __all_models

    Base.metadata.create_all(engine)


def create_session() -> Session:
    global __factory
    return __factory()
