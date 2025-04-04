// app/api/dashboard/mood-tracker/route.ts (make sure the path matches your project structure)
import { db } from "../../../../configs/db"
import { JOURNAL_TABLE } from "../../../../configs/schema"
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
    
    // Process data for visualizations - keep the date as a Date object
    const moodData = journals.map(journal => ({
      date: journal.createdAt, // Send the full date object
      moodScore: journal.moodScore,
      title: journal.title
    }))
    
    // Calculate mood statistics
    const moodStats = {
      average: moodData.length > 0
        ? moodData.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) / moodData.length
        : 0,
      highest: moodData.length > 0
        ? Math.max(...moodData.map(d => d.moodScore || 0))
        : 0,
      lowest: moodData.length > 0
        ? Math.min(...moodData.map(d => d.moodScore || 0))
        : 0,
      totalEntries: moodData.length
    }
    
    // Calculate monthly averages - use proper date objects
    const monthlyAverages = moodData.reduce((acc, curr) => {
      // Use the full date object to get the month
      const date = new Date(curr.date)
      const month = date.toLocaleString('default', { month: 'long' })
      
      if (!acc[month]) {
        acc[month] = { sum: 0, count: 0 }
      }
      acc[month].sum += curr.moodScore || 0
      acc[month].count++
      return acc
    }, {})
    
    // Calculate averages
    const processedMonthlyAverages = {}
    Object.keys(monthlyAverages).forEach(month => {
      processedMonthlyAverages[month] = monthlyAverages[month].sum / monthlyAverages[month].count
    })
    
    return NextResponse.json({
      moodData,
      moodStats,
      monthlyAverages: processedMonthlyAverages
    })
  } catch (error) {
    console.error("Error fetching mood data:", error)
    return NextResponse.json(
      { error: "Failed to fetch mood data" },
      { status: 500 }
    )
  }
}