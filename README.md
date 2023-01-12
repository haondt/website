# Website

A full-stack implementation of my personal website, using the following technologies:
* Docker
* Angular 15
* NGINX
* LetsEncrypt / Certbot

### Deployment
- clone repo
- `sudo chmod -R 777 app/` (TODO: not this)
- `cd app && bash init-letsencrypt` (only need to do this once ever)
- `docker compose up -d`
