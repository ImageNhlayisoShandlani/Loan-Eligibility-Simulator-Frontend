FROM node:20-alpine

WORKDIR /app

COPY package.json ./

# RUN npm set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]