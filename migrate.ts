import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import {
  DISCORD_EMPTY_DB_TURSO_URL,
  DISCORD_EMPTY_DB_TURSO_TOKEN,
} from "./env";
import ora from "ora";

async function migrateDatabase() {
  const client = createClient({
    url: DISCORD_EMPTY_DB_TURSO_URL,
    authToken: DISCORD_EMPTY_DB_TURSO_TOKEN,
  });

  await migrate(drizzle(client), {
    migrationsFolder: "./migrations",
  });
}

const spinner = ora(`Starting Migration`).start();

await migrateDatabase();

spinner.succeed(`Migration Complete`);
