# build environment
FROM node:14.16.0-alpine3.13 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/real-estate/package.json ./
COPY frontend/real-estate/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent
COPY frontend/real-estate/ ./
RUN npm run build

# production environment
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend/real-estate/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

