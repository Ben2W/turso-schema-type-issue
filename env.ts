import { parseEnv, z } from "znv";
import dotenv from "dotenv";

// Load environment variables from .env file at the root of your project
dotenv.config({ path: "./.env" });

const envResult = parseEnv(process.env, {
  DISCORD_EMPTY_DB_TURSO_URL: z.string().min(1),
  DISCORD_EMPTY_DB_TURSO_TOKEN: {
    schema: z.string().min(1),
  },
});

if (!envResult.DISCORD_EMPTY_DB_TURSO_URL) {
  console.error(
    "Please set up the MIGRATIONS_TURSO_ORG_SLUG environment variables.",
  );
}

if (!envResult.DISCORD_EMPTY_DB_TURSO_TOKEN) {
  console.error(
    "Please set up the MIGRATIONS_TURSO_AUTH_TOKEN environment variables.",
  );
}

export const { DISCORD_EMPTY_DB_TURSO_URL, DISCORD_EMPTY_DB_TURSO_TOKEN } =
  envResult;
