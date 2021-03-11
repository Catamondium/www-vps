FROM node:alpine as base

WORKDIR /app
COPY "package*.json" ./ "tsconfig.json" ./

FROM base as test
RUN npm ci
COPY . .
RUN ["npm", "run", "test"]

FROM base as prod
ENV PORT=3000
ENV NODE_ENV=production
RUN npm ci --production
COPY --chown=node . .
USER node
EXPOSE ${PORT}
HEALTHCHECK CMD curl --fail 127.0.0.1:${PORT} || exit 1
# run w/o typechecking
ENTRYPOINT ["npm", "run", "prod"]
