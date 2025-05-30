# Use a compatible Node.js version (>= 18.18.0)
FROM node:18.18.0-alpine

# Set up the working directory inside the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the project files into the container
COPY . .

# Set Node options for legacy OpenSSL support (if needed)
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy .env file into the container so it can be read by the app
COPY .env .env

# Set the environment variable TMDB_KEY from the .env file
ARG API_KEY
ENV TMDB_KEY=${API_KEY}

# Install project dependencies (with --force to bypass dependency conflict)
RUN npm install

# Build the app
RUN npm run build

# Expose port 3000 for the app to run
EXPOSE 3000

# Run the app in production
CMD ["npm", "start"]

