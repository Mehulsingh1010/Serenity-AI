import { pgTable, boolean, serial, varchar, json,integer ,text} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable('users', {
    id: serial().primaryKey(),
    userName: varchar(),
    email: varchar().notNull(),
    userId: varchar()
  });