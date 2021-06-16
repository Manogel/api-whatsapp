FROM buildkite/puppeteer:latest
# FROM node:14
# Or user node:12

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

# For mac m1 use:
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Here we install all the deps
RUN yarn

# Bundle app source / copy all other files
COPY . .

# Set timezone
ENV TZ='America/Sao_Paulo'
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3333
ENV PORT=3333
