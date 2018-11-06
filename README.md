# Usage

## required softwares & version this project is using

| Softwares | Versions        |
| --------- | --------------- |
| npm       | 6.1.0           |
| pip3      | 9.0.1           |
| nodejs    | 10.7.0          |
| python3   | 3.6.5           |
| mongodb   | 3.6             |
| Redis     | 4.0.11          |
| rabbitmq  | using CloudAMQP |

default redis port: 6379
default mongodb port: 27017

## Development

### News Pipeline

1. script to auto launch the data pipeline

```terminal
sh news_pipeline_launcher.sh
```

### Backend Server

1. install dependencies & start application

```terminal
sh launcher.sh
```

Application will be serving on http://localhost:4040

### Web Server

1. install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3030

### Web Client

1. install dependencies & start application

```terminal
npm install
npm start
```

Application will be serving on http://localhost:3000
