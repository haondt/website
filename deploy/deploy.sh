#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "deploying in dev mode"
elif [ "$1" == "--prod" ]; then
  echo "deploying in prod mode"
else
  echo "Invalid option. Usage: ./deploy.sh [--prod]"
  exit 1
fi

if docker image inspect pyyaml &> /dev/null; then
    echo "pyyaml image already exists. Skipping build."
else
    docker build -t pyyaml ./yml2env -f ./yml2env/pyyaml.dockerfile
fi

docker run --rm \
     -v $(pwd):/app -w /app \
    pyyaml \
    python3 yml2env/yml2env.py > deploy.env

docker compose -f docker-compose.dev.yml up -d --build