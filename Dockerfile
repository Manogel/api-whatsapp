FROM buildkite/puppeteer:latest
# Or user node:12

WORKDIR /app

# Copy files we need
COPY src /app/src
COPY yarn.lock /app
COPY Makefile /app
COPY nodemon.json /app
COPY package.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app
COPY nest-cli.json /app

# Install our package
RUN yarn

# Set timezone
ENV TZ='America/Sao_Paulo'
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

