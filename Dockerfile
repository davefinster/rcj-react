FROM node:8.12.0-stretch
WORKDIR /src
COPY . .
RUN npm install && \
    npm run build

FROM kyma/docker-nginx
COPY --from=0 /src/build/ /var/www
COPY default /etc/nginx/sites-enabled/default
CMD 'nginx'