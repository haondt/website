FROM python
#RUN apk --update add bash nano
RUN apt-get update
RUN mkdir /code

# install flask requirements
WORKDIR /code
COPY ./flask/requirements.txt /code
RUN pip install numpy
RUN pip install -r requirements.txt

# set up directory for cloning project repos
WORKDIR /projects
RUN apt-get install git

# clone ascii-art project
RUN ["git", "clone", "https://github.com/haondt/ascii-art.git"]
