FROM node:12.19.0
ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]