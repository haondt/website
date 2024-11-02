FROM python:3.11.1-alpine

WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY website /app

ENTRYPOINT ["gunicorn", "-w", "1", "-b", "0.0.0.0", "website:website"]
