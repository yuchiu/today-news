from pymongo import MongoClient  # pylint: disable=E0401

MONGO_DB_HOST = 'localhost'
MONGO_DB_PORT = '27017'
DB_NAME = 'latest-news'

# instance
client = MongoClient("%s:%s" % (MONGO_DB_HOST, MONGO_DB_PORT))


def get_db(db=DB_NAME):
    db = client[db]
    return db
