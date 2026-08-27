import fs from "fs";
import path from "path";

const ENV_PATH = path.join(__dirname, "../../.env.development.local");

async function globalTeardown() {
  if (fs.existsSync(ENV_PATH)) fs.unlinkSync(ENV_PATH);
}

export default globalTeardown;
