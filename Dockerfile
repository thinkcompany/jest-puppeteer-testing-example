FROM thinkcompany/docker-node-chrome:latest

COPY ./ /app

WORKDIR /app

RUN npm install --quiet

ENV PATH="${PATH}:/app/node_modules/.bin"
