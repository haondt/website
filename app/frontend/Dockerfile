FROM node:alpine
WORKDIR /code/

# copy frontend package.json files
#COPY ./frontend/package.json .
#COPY ./frontend/package-lock.json .
#ENV PATH /app/node_modules/.bin:$PATH

# install node modules
RUN apk add --no-cache git
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm install --save react-router-dom --silent
RUN npm install --save react-p5

# copy rest of frontend source files
COPY ./frontend .

#EXPOSE 3000

CMD ["npm", "start"]

