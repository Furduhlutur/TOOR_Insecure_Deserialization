FROM python:latest

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN pip3 install flask==1.0
RUN pip3 install flask-cors
RUN apt-get update -yqq && apt-get install -yqq iputils-ping netcat-traditional
RUN useradd adversary --shell /bin/bash --no-create-home
ADD . /Backend
WORKDIR /Backend
RUN chown root:adversary -R /Backend && chmod 755 -R /Backend
RUN mv /Backend/Frontend/build /Backend

ENV FLASK_APP=Backend/Api
EXPOSE 5000
RUN flask init-db
CMD ["flask", "run", "-h", "0.0.0.0"]
