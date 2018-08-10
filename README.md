# Usage

#### required softwares & version this project is using during development

```
ubuntu    18.04.1

mongodb   4.0.0
Redis     4.0.11
rabbitmq  using CloudAMQP's RabbitMQ service

npm       6.1.0
nodejs    10.7.0
python3   3.6.5
pip3      9.0.1
```

## Development

#### DataBases - Terminal

1.  start databases(linux environment)

```
sudo systemctl start mongod
sudo systemctl start redis
```

default redis port: 6379
default mongodb port: 27017

#### Web Server - Terminal A

1.  install dependencies & start application

```
npm install
npm start
```

Application will be serving on http://localhost:3200

#### Web Client - Terminal B

1.  install dependencies & start application

```
npm install
npm start
```

Application will be serving on http://localhost:8080

#### Backend Server - Terminal C

1.  install dependencies & start application

```
pip install -r requirements.txt
python service.py
```

Application will be serving on http://localhost:4040

#### News Pipeline Service - Terminal D

1.  script to auto launch the service

```
sh news_pipeline_launcher.sh
```
