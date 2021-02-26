ARG PORT=8080
FROM node:12.19.0 as base

WORKDIR /app
COPY "package*.json" ./

FROM base as test
RUN npm ci
COPY . .
RUN ["npm", "test"]

FROM base as prod
ENV NODE_ENV=production
RUN npm ci --production
COPY --chown=node . .
USER node
ENV PORT=$PORT
EXPOSE ${PORT}

HEALTHCHECK CMD curl 127.0.0.1:${PORT}/
CMD ["npm", "start"]
