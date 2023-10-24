FROM node:lts

WORKDIR /service-user

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 4002

CMD ["node", "app.js"]