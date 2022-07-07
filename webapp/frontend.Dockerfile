FROM alpine:3.14

RUN apk update
RUN apk add nodejs npm

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]