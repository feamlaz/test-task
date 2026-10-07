FROM node:22-bookworm-slim AS builder

RUN apt-get update \
  && apt-get install --no-install-recommends -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npm ci

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
COPY prisma ./prisma

RUN npx prisma generate
RUN npx nest build
RUN npx tsc prisma/seed.ts --outDir dist --rootDir prisma --target ES2023 --module commonjs --moduleResolution node --esModuleInterop --strict --skipLibCheck --noEmitOnError

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production

RUN apt-get update \
  && apt-get install --no-install-recommends -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev --ignore-scripts \
  && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated/prisma ./generated/prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY docker/entrypoint.sh ./docker/entrypoint.sh

RUN groupadd --system --gid 10001 app \
  && useradd --system --uid 10001 --gid app --home-dir /app --shell /usr/sbin/nologin app \
  && chmod +x /app/docker/entrypoint.sh \
  && chown -R app:app /app

USER app

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=45s --retries=10 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["node", "dist/main.js"]
