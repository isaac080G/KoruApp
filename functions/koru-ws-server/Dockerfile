
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev


FROM node:20-alpine AS runner


RUN addgroup -S koru && adduser -S koru -G koru

WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY server.js ./


ENV NODE_ENV=production

USER koru

CMD ["node", "server.js"]
