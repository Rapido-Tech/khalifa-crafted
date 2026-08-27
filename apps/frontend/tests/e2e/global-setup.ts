import { FullConfig } from "@playwright/test";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const ENV_PATH = path.join(__dirname, "../../.env.development.local");
let mockServer: ReturnType<typeof spawn> | null = null;

async function globalSetup(_config: FullConfig) {
  // Write .env.test.local so Next.js picks up the mock API URL
  fs.writeFileSync(ENV_PATH, "API_URL=http://localhost:4001/api/v1\n");

  // Start mock API server
  mockServer = spawn("node", [path.join(__dirname, "mock-api.mjs")], {
    stdio: "inherit",
    detached: false,
  });

  // Wait until port 4001 is accepting connections
  await waitForPort(4001, 10_000);
}

async function waitForPort(port: number, timeout: number) {
  const { createConnection } = await import("net");
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const ok = await new Promise<boolean>((resolve) => {
      const socket = createConnection(port, "127.0.0.1");
      socket.once("connect", () => { socket.destroy(); resolve(true); });
      socket.once("error", () => resolve(false));
    });
    if (ok) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Port ${port} did not open within ${timeout}ms`);
}

export default globalSetup;
