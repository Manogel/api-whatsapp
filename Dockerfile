FROM buildkite/puppeteer:latest
# FROM node:14
# Or user node:12

WORKDIR /app

# Copy files we need
COPY src /app/src
COPY yarn.lock /app
COPY Makefile /app
COPY package.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app
COPY nest-cli.json /app
COPY prisma /app/prisma/

# For mac m1 use:
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install our package
RUN yarn

# Set timezone
ENV TZ='America/Sao_Paulo'
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3333
ENV PORT=3333
