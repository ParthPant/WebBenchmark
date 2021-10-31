FROM alpine:3.14

RUN apk update
RUN apk add docker docker-compose
RUN apk add nodejs npm make gcc g++ sudo

RUN mkdir -p /var/lib/db/

WORKDIR /server

COPY . .

RUN npm install
RUN npm run build

ENV PORT=8080

EXPOSE 8080

ENV REDIS_PORT=6379
ENV NOBODY_UID=65534
ENV REDIS_HOST='redis'

CMD ["npm", "run", "start"]
