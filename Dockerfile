FROM nginx:latest
WORKDIR /usr/share/nginx/html/mvp
ADD ./dist /usr/share/nginx/html/mvp