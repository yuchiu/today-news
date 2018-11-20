from pymongo import MongoClient  # pylint: disable=E0401

import os
import sys
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

DB_DEFAULT_MONGO_DB_HOST = os.environ.get("DB_DEFAULT_MONGO_DB_HOST")
DB_DEFAULT_MONGO_DB_PORT = os.environ.get("DB_DEFAULT_MONGO_DB_PORT")
DB_DEFAULT_MONGO_DB_NAME = os.environ.get("DB_DEFAULT_MONGO_DB_NAME")


# instance
client = MongoClient("%s:%s" %
                     (DB_DEFAULT_MONGO_DB_HOST, DB_DEFAULT_MONGO_DB_PORT))


def get_db(db=DB_DEFAULT_MONGO_DB_NAME):
    db = client[db]
    return db
