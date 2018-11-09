import jsonrpclib

URL = "http://localhost:6060/"

client = jsonrpclib.ServerProxy(URL)


def getPreferenceForUser(userId):
    preference = client.getPreferenceForUser(userId)
    print("Preference list: %s" % str(preference))
    return preference
