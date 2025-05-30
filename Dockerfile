FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

# Declare build-time variable
ARG API_KEY

# Set runtime env var using build-time value
ENV TMDB_KEY=${API_KEY}

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

