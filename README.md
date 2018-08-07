# Usage

#### required softwares & version this project is currently using

```
ubuntu    18.04.1

mongodb   4.0.0
Redis     4.0.11

npm       6.1.0
nodejs    10.7.0
python    2.7.15
pip       9.0.1
```

## Development

#### Start DataBases - Terminal

```
sudo systemctl start mongod
sudo systemctl start redis
```

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

#### News Monitor Service - Terminal D

1.  install dependencies & start application

```
pip install -r requirements.txt
python news_monitor.py
```
