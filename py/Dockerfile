# syntax=docker/dockerfile:1

FROM python:3.11-slim
WORKDIR /
RUN pip install flask
COPY . .
ENV SEKRUT "Secret"
CMD ["python3" ,"test.py"]
EXPOSE 5000