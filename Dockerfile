FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app code
COPY . .

EXPOSE 3000
CMD ["npm","run","dev"]