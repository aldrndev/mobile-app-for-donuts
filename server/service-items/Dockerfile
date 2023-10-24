FROM node:lts

WORKDIR /service-item

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 4001

CMD ["node", "app.js"]