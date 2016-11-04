FROM nginx

COPY ./dist/ /usr/share/nginx/html/spa/
COPY ./layout/dist/ /usr/share/nginx/html/spa/layout-demo/

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
