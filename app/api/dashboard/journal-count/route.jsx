import { NextResponse } from "next/server"
import { db } from "../../../../configs/db"
import { JOURNAL_TABLE} from "../../../../configs/schema"
import { sql } from "drizzle-orm"
import { z } from "zod"
export async function GET(req) {
  try {
    // Get userId from query params
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ count: 0 })
    }

    // Count user's journal entries
    const result = await db
      .select({ count: sql`count(*)` })
      .from(JOURNAL_TABLE)
      .where(sql`${JOURNAL_TABLE}.user_id = ${userId}`)

    const count = Number(result[0]?.count || 0)

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error counting journal entries:", error)
    return NextResponse.json({ count: 0 })
  }
}
