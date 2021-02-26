FROM node:12.19.0 as base

WORKDIR /app
COPY "package*.json" ./

FROM base as test
RUN npm ci
COPY . .
RUN ["npm", "test"]

FROM base as prod

ENV PORT 3000
ENV NODE_ENV=production
RUN npm ci --production
COPY --chown=node . .
USER node
EXPOSE ${PORT}
HEALTHCHECK CMD curl 127.0.0.1:${PORT}/
CMD ["npm", "start"]
