import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'utils'))

from cloudAMQP_client import CloudAMQPClient  # pylint: disable=E0401

CLOUDAMQP_URL = "amqp://rutjjghd:azj53edQjx1lCSpICxmnKrhc0cE9OFOW@lion.rmq.cloudamqp.com/rutjjghd"

QUEUE_NAME = 'test_new_task_queue'


def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, QUEUE_NAME)

    sentMsg = {'test': 'test'}
    client.sendMessage(sentMsg)

    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg

    print('test_basic passed.')


if __name__ == "__main__":
    test_basic()
