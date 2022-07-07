FROM alpine:latest

RUN apk update
RUN apk add --no-cache --upgrade bash
RUN apk add nodejs npm
RUN apk add bash make gcc g++ sudo
RUN apk add dos2unix --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/ --allow-untrusted

RUN mkdir -p /var/lib/db/

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build
RUN dos2unix profiler/run-safe.sh

ENV PORT=8080

EXPOSE 8080

ENV REDIS_PORT=6379
ENV NOBODY_UID=65534
ENV REDIS_HOST='redis'

CMD ["npm", "run", "dev"]
