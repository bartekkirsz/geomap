FROM python:3.8

EXPOSE 5000

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONBUFFERED 1

ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /api
ADD . /api