import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { MAIN_DB_TURSO_URL, MAIN_DB_TURSO_TOKEN } from "./env";
import ora from "ora";

async function wipeGlobalDatabase() {
  const client = createClient({
    url: MAIN_DB_TURSO_URL,
    authToken: MAIN_DB_TURSO_TOKEN,
  });

  // Wipe tables
  const tablesSQL = await client.execute(`
    SELECT 'DROP TABLE ' || name || ';' as sql
    FROM sqlite_master
    WHERE type = 'table'
  `);
  for (const table of tablesSQL.rows) {
    await client.execute(table.sql as string);
  }

  // Wipe triggers
  const triggersSQL = await client.execute(`
    SELECT 'DROP TRIGGER ' || name || ';' as sql
    FROM sqlite_master
    WHERE type = 'trigger'
  `);
  for (const trigger of triggersSQL.rows) {
    await client.execute(trigger.sql as string);
  }

  // Wipe views
  const viewsSQL = await client.execute(`
    SELECT 'DROP VIEW ' || name || ';' as sql
    FROM sqlite_master
    WHERE type = 'view'
  `);
  for (const view of viewsSQL.rows) {
    await client.execute(view.sql as string);
  }
}

const spinner = ora(`Starting Wipe`).start();

await wipeGlobalDatabase();

spinner.succeed(`Wipe Complete`);
