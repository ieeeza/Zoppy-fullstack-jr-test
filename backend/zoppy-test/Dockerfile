FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY nest-cli.json ./
RUN npm install
COPY src ./src/
RUN npm run build
FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts # 'npm ci' é ideal para builds, garante deps exatas do package-lock.json
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]