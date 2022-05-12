FROM node:14-alpine as build

WORKDIR /app

COPY . /app/
ARG REACT_APP_BACKEND_HOST=$SPRINGBOOT_PORT_8080_TCP_ADDR
ARG REACT_APP_BACKEND_PORT=$SPRINGBOOT_PORT_8080_TCP_PORT
RUN echo $SPRINGBOOT_PORT_8080_TCP_ADDR

RUN npm install --silent
#RUN npm isntall react-scripts@3.0.1 -g --silent
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
#run nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]