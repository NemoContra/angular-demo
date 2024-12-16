FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci -f

COPY . .

RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/angular-demo /app/dist/apps/angular-demo

RUN chown -R node:node /app

USER node

EXPOSE 4000

CMD ["node", "/app/dist/apps/angular-demo/server/server.mjs"]
