FROM node:22.17.1-alpine AS base

WORKDIR /usr/src/wpp-server
ENV NODE_ENV=production PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json ./
RUN apk update && apk add --no-cache \
    vips-dev fftw-dev gcc g++ make libc6-compat \
    && rm -rf /var/cache/apk/*

RUN yarn install --production --pure-lockfile \
    && yarn add sharp --ignore-engines \
    && yarn cache clean

# ------------------------

FROM base AS build

WORKDIR /usr/src/wpp-server
COPY . .
RUN yarn install --pure-lockfile
RUN yarn build

# ------------------------

FROM base

WORKDIR /usr/src/wpp-server

RUN apk add --no-cache chromium

COPY --from=build /usr/src/wpp-server /usr/src/wpp-server
COPY .env .env

VOLUME ["/usr/src/wpp-server/userDataDir"]

EXPOSE 21465
ENTRYPOINT ["node", "dist/server.js"]
