FROM node:lts

WORKDIR /orchestrator-graphql

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]

