import json
import os
import sys

from bson.json_util import dumps  # pylint: disable=E0401

sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'utils'))
import mongodb_client  # pylint: disable=E0401


def get_one_news():
    """Get one news"""
    res = mongodb_client.get_db()['news'].find_one()
    return json.loads(dumps(res))
