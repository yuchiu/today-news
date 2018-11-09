import jsonrpclib

URL = "http://localhost:7070"

client = jsonrpclib.ServerProxy(URL)


def classify(text):
    topic = client.classify(text)
    print("Topic: %s" % str(topic))
    return topic
