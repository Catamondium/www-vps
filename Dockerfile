FROM node:alpine AS base
WORKDIR /build
COPY "package*.json" ./ "tsconfig.json" ./

FROM base AS build
# Seperately prepare production modules
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --only=production
RUN cp -R node_modules prod_node_modules
# Dev depends & compile
COPY ./src ./src
COPY ./scss ./scss
RUN npm install &&\
    npm run scss &&\
    npm run build

FROM build AS test
COPY . .
RUN npm run test

FROM base AS release
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=production
# forward build & prod depends
COPY --from=build --chown=9000 \
    /build/prod_node_modules ./node_modules/
COPY --from=build --chown=9000 \
    /build/public/css ./public/css
COPY --from=build --chown=9000 \
    /build/dist ./dist/
# Copy over static resources
COPY --chown=9000 ./views ./views
COPY --chown=9000 ./public ./public

USER 9000
EXPOSE ${PORT}
HEALTHCHECK CMD curl --fail 127.0.0.1:${PORT} || exit 1
# run w/o typechecking
ENTRYPOINT ["npm", "run", "prod"]
