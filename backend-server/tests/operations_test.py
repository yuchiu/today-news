import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'utils'))
import operations  # pylint: disable=import-error


def test_get_one_news_basic():
    news = operations.get_one_news()
    print(news)
    assert news is not None
    print('test_get_one_news_basic passed!')


if __name__ == '__main__':
    test_get_one_news_basic()
