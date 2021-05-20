# build stage
FROM node:alpine as build-stage
WORKDIR /app/

# copy frontend files
COPY ./frontend/frontend /app/

# copy frontend config file
COPY ./frontend/config.json /app/src/

# install and build frontend
RUN npm install
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/build /dist/
