FROM node:12.19.0
ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]