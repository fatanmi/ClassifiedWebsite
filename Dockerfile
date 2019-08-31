### STAGE 1: Build ###
FROM mhart/alpine-node:12 as builder
# Preparing working environment.
# RUN mkdir -p /usr/src/app
WORKDIR /app

# Installing dependencies.
COPY . .
RUN npm install
# Copy app source into image.
#COPY . /app
# Building app.
RUN npm run-script build


### STAGE 2: Setup ###
FROM nginx:1.13.12-alpine
# Removing nginx default page.
RUN rm -rf /usr/share/nginx/html/*
# Copying nginx configuration.
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

# Copying openhome-panel source into web server root.
COPY --from=builder /app/dist /usr/share/nginx/html
# Exposing ports.
EXPOSE 80
# Starting server.
CMD ["nginx", "-g", "daemon off;"]
