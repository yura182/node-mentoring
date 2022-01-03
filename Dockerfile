FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8182
CMD npm run start