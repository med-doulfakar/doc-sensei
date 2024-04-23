import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

//enums
export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

//tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  imageUrl: varchar("image_url").notNull(),
  name : varchar("name"),
  email : varchar("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type DocUser = typeof users.$inferSelect;

export const chats = pgTable("chats", {
  id: text("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  fileKey: text("file_key").notNull(),
});
export type DocChat = typeof chats.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: text("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum("role").notNull(),
});
