FROM node:20 as builder
WORKDIR /project
COPY . /project
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder project/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf etc/nginx/conf.d