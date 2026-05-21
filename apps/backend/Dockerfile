# ─── base: Node + pnpm via corepack ──────────────────────────────────────────
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ─── deps: install all workspace deps (cache layer) ──────────────────────────
FROM base AS deps
WORKDIR /app
# Copy workspace manifests only — source changes won't bust this layer
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile

# ─── builder: compile TypeScript ─────────────────────────────────────────────
FROM deps AS builder
COPY apps/backend/src ./apps/backend/src
COPY apps/backend/tsconfig.json ./apps/backend/
RUN pnpm --filter @khalifa/backend build

# ─── runner: minimal production image ────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["node", "dist/server.js"]
