FROM node:16-alpine AS builder
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./



RUN yarn install --production
# If you are building your code for production
# RUN npm ci --only=production
# RUN npm i

# Bundle app source
COPY . . 
# EXPOSE 8080
CMD [ "npm", "start"]