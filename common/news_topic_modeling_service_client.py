import jsonrpclib

import os
import sys
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

SERVICE_TOPIC_MODELING_URL = os.environ.get("SERVICE_TOPIC_MODELING_URL")

client = jsonrpclib.ServerProxy(SERVICE_TOPIC_MODELING_URL)


def classify(text):
    topic = client.classify(text)
    print("Topic: %s" % str(topic))
    return topic
