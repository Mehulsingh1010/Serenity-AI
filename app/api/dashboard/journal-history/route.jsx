import { db } from "@/configs/db"
import { JOURNAL_TABLE } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const journals = await db
      .select()
      .from(JOURNAL_TABLE)
      .where(eq(JOURNAL_TABLE.userId, userId))
      .orderBy(JOURNAL_TABLE.createdAt)

    return NextResponse.json({ journals })
  } catch (error) {
    console.error("Error fetching journals:", error)
    return NextResponse.json(
      { error: "Failed to fetch journals" },
      { status: 500 }
    )
  }
}
