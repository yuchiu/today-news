import jsonrpclib

import os
import sys
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

SERVICE_RECOMMENDATION_URL = os.environ.get("SERVICE_RECOMMENDATION_URL")

client = jsonrpclib.ServerProxy(SERVICE_RECOMMENDATION_URL)


def getPreferenceForUser(userId):
    preference = client.getPreferenceForUser(userId)
    print("Preference list: %s" % str(preference))
    return preference
