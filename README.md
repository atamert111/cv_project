

## venv

venv yarat ve active et
```bash
python -m venv venv
source venv/bin/activate
```

venv deactive et
```bash
deactivate
```

## pip install dependencies
```bash
pip install -r requirements.txt
```

## run server with port

```bash

FLASK_APP=src/main.py flask run --host=0.0.0.0 --port=5000

```

## docker build
```bash
docker build -t atamert/cv-creater:1.0.1 .
```

## docker copy
```bash
docker save atamert/cv-creater:1.0.1 | bzip2 | pv | ssh -i "XXXX.pem" xxx@XXXX docker load
```

## docker run
```bash
docker run -p 5000:5000 --rm atamert/cv-creater:1.0.1
```

## docker run and create on server
```bash
docker run -p 5000:5000 -d --name cv-creater atamert/cv-creater:1.0.1
```

## docker stop on server
```bash
docker stop cv-creater
```
## docker start on server
```bash
docker start cv-creater
```

## docker logs on server
```bash
docker logs -f cv-creater
```
