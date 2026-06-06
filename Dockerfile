# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

# Railway injects PORT at runtime; default to 3000
ENV PORT=3000

EXPOSE $PORT

# serve the SPA — `-s` enables single-page-app mode (rewrites all routes to index.html)
CMD ["sh", "-c", "serve -s dist -l $PORT"]
