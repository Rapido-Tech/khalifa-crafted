# syntax=docker/dockerfile:1
# ─── base: Node + pnpm via corepack ──────────────────────────────────────────
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ─── deps: install all workspace deps (cache layer) ──────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY apps/admin/package.json ./apps/admin/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ─── builder: Vite build ──────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

COPY packages/types/src ./packages/types/src
COPY apps/admin ./apps/admin

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN --mount=type=cache,id=vite-cache,target=/app/apps/admin/node_modules/.vite \
    pnpm --filter @khalifa/admin build

# ─── runner: nginx serving static dist ───────────────────────────────────────
FROM nginx:alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
