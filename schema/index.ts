import { text, integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const channel = sqliteTable("channel", {
  id: text("id").$defaultFn(createId).primaryKey(),
  slug: text("slug", { length: 256 }).notNull(),
  description: text("description", { length: 512 }).notNull(),
  channelType: text("channelType", { length: 256 }).notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  deletedAt: integer("deletedAt"),
});

export const message = sqliteTable("message", {
  id: text("id").$defaultFn(createId).primaryKey(),
  channelId: text("channelId").notNull(),
  userId: text("userId").notNull(),
  message: text("message", { length: 60000 }).notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  deletedAt: integer("deletedAt"),
});

export const unGroupedMessage = sqliteTable("unGroupedMessage", {
  messageId: text("messageId")
    .references(() => message.id, { onDelete: "cascade" })
    .primaryKey(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const generatedConversation = sqliteTable("generatedConversation", {
  id: text("id").$defaultFn(createId).primaryKey(),
  channelId: text("channelId").notNull(),
  summary: text("summary", { length: 10000 }),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const generatedConversationMessage = sqliteTable(
  "generatedConversationMessage",
  {
    id: text("id").$defaultFn(createId).primaryKey(),
    messageId: text("messageId")
      .notNull()
      .references(() => message.id, { onDelete: "cascade" }),
    conversationId: text("conversationId")
      .notNull()
      .references(() => generatedConversation.id, { onDelete: "cascade" }),
    createdAt: integer("createdAt")
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updatedAt")
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (t) => ({
    unq: unique().on(t.messageId, t.conversationId),
  }),
);
