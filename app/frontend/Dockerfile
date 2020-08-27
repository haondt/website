FROM node:alpine
WORKDIR /code/

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

#ENV PATH /app/node_modules/.bin:$PATH

RUN apk add --no-cache git
RUN npm install --silent
RUN npm install react-scripts -g --silent

#COPY ./frontend .

#EXPOSE 3000

CMD ["npm", "start"]

