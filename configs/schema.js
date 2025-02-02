import { pgTable, serial, varchar, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core"

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  userName: varchar(),
  email: varchar().notNull(),
  userId: varchar(),
})

export const JOURNAL_TABLE = pgTable("journals", {
  id: serial().primaryKey(),
  userId: integer().references(() => USER_TABLE.id),
  title: varchar().notNull(),
  content: text().notNull(),
  moodScore: integer(),
  analysis: jsonb(), // Will store detailed analysis including emotions, topics, and suggestions
  createdAt: timestamp().defaultNow(),
})



export const MOOD_SUGGESTION_TABLE = pgTable("mood_suggestions", {
  id: serial().primaryKey(),
  moodRange: varchar().notNull(),
  suggestion: text().notNull(),
  articleUrl: varchar(),
})

