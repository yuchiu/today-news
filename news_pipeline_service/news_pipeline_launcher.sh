#!/bin/bash
sudo systemctl start redis
sudo systemctl start mongod

pip3 install -r requirements.txt

python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_deduper.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)