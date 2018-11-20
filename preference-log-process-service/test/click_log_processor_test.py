from datetime import datetime
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
import service  # pylint: disable=E0401

# import config package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'common'))

import mongodb_client  # pylint: disable=E0401

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path)

DB_PREFERENCE_MODEL_TABLE_NAME = os.environ.get(
    "DB_PREFERENCE_MODEL_TABLE_NAME")
DB_NEWS_TABLE_NAME = os.environ.get("DB_NEWS_TABLE_NAME")

print(DB_PREFERENCE_MODEL_TABLE_NAME)

NUM_OF_CLASSES = 17

# Start MongoDB before running following tests.


def test_basic():
    db = mongodb_client.get_db()
    db[DB_PREFERENCE_MODEL_TABLE_NAME].delete_many({"userId": "test_user"})

    msg = {"userId": "test_user",
           "newsId": "test_news",
           "timestamp": str(datetime.utcnow())}

    service.handle_message(msg)

    model = db[DB_PREFERENCE_MODEL_TABLE_NAME].find_one(
        {'userId': 'test_user'})
    assert model is not None
    assert len(model['preference']) == NUM_OF_CLASSES

    print('test_basic passed!')


if __name__ == "__main__":
    test_basic()
