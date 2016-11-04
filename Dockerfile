FROM nginx
COPY ./dist/ /usr/share/nginx/html/
COPY ./layout/dist/ /usr/share/nginx/html/layout-demo/

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
