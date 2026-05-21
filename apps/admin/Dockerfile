# ─── base: Node + pnpm via corepack ──────────────────────────────────────────
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ─── deps: install all workspace deps (cache layer) ──────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY apps/admin/package.json ./apps/admin/
RUN pnpm install --frozen-lockfile

# ─── builder: Vite build ──────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

# Types source needed for tsc resolution via workspace symlink
COPY packages/types/src ./packages/types/src
COPY apps/admin ./apps/admin

# VITE_* vars are baked into the bundle at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm --filter @khalifa/admin build

# ─── runner: nginx serving static dist ───────────────────────────────────────
FROM nginx:alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
