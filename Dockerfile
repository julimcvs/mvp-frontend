FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html/mvp
ADD ./dist /usr/share/nginx/html/mvp