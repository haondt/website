FROM node:alpine

WORKDIR /code/
RUN apk add --no-cache git

# copy frontend package.json files
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
# install node modules
RUN npm install

# copy rest of frontend source files and set ownership to node user
COPY --chown=node ./frontend .


CMD ["npm", "start"]

