FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=./dist/out --configuration=production
FROM nginx:alpine AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]