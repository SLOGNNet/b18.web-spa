FROM nginx

COPY ./dist/ /usr/share/nginx/html/spa/

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
