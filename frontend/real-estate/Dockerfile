# build environment
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /arahomes/frontend

COPY package.json .

RUN npm install

# Copy the rest of the files to the Docker image
COPY . .

# Build the application
RUN npm run build

#STAGE BUILD TWO
FROM node:18-alpine as PRODUCTION_BUILD

WORKDIR /arahomes/frontend

COPY --from=BUILD_IMAGE /arahomes-frontend/dist/ /arahomes-frontend/dist/

EXPOSE 8080

CMD ["npm", "run", "dev"]
