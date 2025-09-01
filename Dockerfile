# Etapa base con la versión exacta que requiere @wppconnect/server
FROM node:22.17.1-alpine AS base
WORKDIR /usr/src/wpp-server
ENV NODE_ENV=production PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copiamos dependencias
COPY package.json yarn.lock ./

# Instalamos dependencias necesarias del sistema
RUN apk update && \
    apk add --no-cache \
    vips-dev \
    fftw-dev \
    gcc \
    g++ \
    make \
    libc6-compat \
    && rm -rf /var/cache/apk/*

# Instalamos dependencias en modo producción
RUN yarn install --production --pure-lockfile --ignore-engines && \
    yarn add sharp --ignore-engines && \
    yarn cache clean

# ==============================
# Etapa de build
# ==============================
FROM base AS build
WORKDIR /usr/src/wpp-server
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json yarn.lock ./
RUN yarn install --production=false --pure-lockfile --ignore-engines && \
    yarn cache clean

COPY . .
RUN yarn build

# ==============================
# Etapa final
# ==============================
FROM base
WORKDIR /usr/src/wpp-server/

# Instalar Chromium necesario para puppeteer
RUN apk add --no-cache chromium && \
    yarn cache clean

# Copiar el código compilado desde la etapa build
COPY --from=build /usr/src/wpp-server/ /usr/src/wpp-server/

# Exponer el puerto configurado
EXPOSE 21465

# Comando de inicio
ENTRYPOINT ["node", "dist/server.js"]
