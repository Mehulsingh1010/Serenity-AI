"use server"

import { db } from "@/configs/db"
import { JOURNAL_TABLE } from "@/configs/schema"
import { eq } from "drizzle-orm"

export async function deleteUserJournals(userId) {
  try {
    await db
      .delete(JOURNAL_TABLE)
      .where(eq(JOURNAL_TABLE.userId, userId))
  } catch (error) {
    console.error("Error deleting user journals:", error)
    throw error
  }
}