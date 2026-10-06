FROM oven/bun:1-alpine 
WORKDIR /app

COPY package.json bun.lock ./
# hanya install kalau bun.lock sesuai dengan package.json
# hanya install dependencies 
RUN bun install --frozen-lockfile --production

COPY . .
ENV NODE_ENV=production
ENV PORT=8500
EXPOSE 8500

CMD ["bun", "run", "src/server.ts"]