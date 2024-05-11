# This repo needs Bun to work

## When creating a new database with `turso db create <name> --type schema` I cannot migrate it with Drizzle. Server returned HTTP status 500

These are the steps to reproduce.

First use the turso cli to create a new database and use this command:

`turso db create <name> --type schema`

Then you need to put the URL and TOKEN in the .env file in the root of the project.

`.env`

```
DISCORD_EMPTY_DB_TURSO_URL={LIBSQL_URL}
DISCORD_EMPTY_DB_TURSO_TOKEN={LIBSQL_TOKEN}
```

To get the URL run this command:

`turso db show <name>`

To get the TOKEN of this database run this command:

`turso db tokens create <name>`

Then run `bun migrate` to get the error.

## Clearly `--type schema` is the issue, as when you remove it it migrates fine.
