FROM alpine:3.14

RUN apk update
RUN apk add docker docker-compose
RUN apk add nodejs npm make gcc g++

COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:latest /usr/local/bin/docker-compose /usr/bin/docker-compose

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build

ENV PORT=8080
ENV REDIS_PORT=6379
ENV NOBODY_UI=65534
ENV REDIS_HOST='redis-server'

CMD ["npm", "run", "start"]