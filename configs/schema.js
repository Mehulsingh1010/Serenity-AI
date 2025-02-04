import { pgTable, serial, varchar, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core"
export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  userName: varchar(),
  email: varchar().notNull(),
  userId: varchar().notNull().unique(), // Ensure it's unique for each user
});


export const JOURNAL_TABLE = pgTable("journals", {
  id: serial().primaryKey(),
  userId: varchar().references(() => USER_TABLE.userId), // Change from integer to varchar
  title: varchar().notNull(),
  content: text().notNull(),
  moodScore: integer(),
  analysis: jsonb(), // Stores detailed analysis
  createdAt: timestamp().defaultNow(),
});

