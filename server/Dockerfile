FROM alpine:3.13

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone

RUN apk add ca-certificates

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories \
&& apk add --update --no-cache nodejs npm

WORKDIR /app

COPY package*.json /app/

RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

RUN npm install -g pnpm && pnpm install

COPY . /app

CMD ["npm", "start"]
