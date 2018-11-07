#!/bin/bash
pip3 install -r requirements.txt

python3 trainer/news_class_trainer.py

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)