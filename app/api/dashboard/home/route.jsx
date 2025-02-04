import { NextResponse } from "next/server"
import { db } from "@/configs/db"
import { JOURNAL_TABLE } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const ANALYSIS_PROMPT = `Analyze this journal entry and provide a detailed response in the following JSON format:

{
  "moodScore": <number between 1-10>,
  "summary": "<In depth summary/overview atleast 600 words of emotional state>",
  "emotions": {
    "primary": "<Main emotion>",
    "secondary": ["<Array of other detected emotions>"],
    "intensity": "<Description of emotional intensity>"
  },
  "topics": ["<Array of main themes or topics discussed>"],
  "suggestions": {
    "immediate": "<Immediate action for current state>",
    "longTerm": "<Long-term recommendation>",
    "activities": ["<Array of recommended activities>"],
    "resources": ["<Array of helpful resources or articles>"]
  }
}

Ensure that the response is a valid JSON object. Provide a comprehensive analysis with detailed suggestions and multiple activities and resources. Do not include any additional text or formatting outside of the JSON structure.

Journal Entry to analyze: `

export async function POST(req) {
  try {
    const { userId, title, content } = await req.json()

    // Analyze mood using Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(ANALYSIS_PROMPT + content)
    const response = await result.response
    let analysis

    try {
      const rawText = response.text()
      const jsonContent = rawText.replace(/^```json\n|\n```$/g, "").trim()
      analysis = JSON.parse(jsonContent)
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      console.log("Raw AI response:", response.text())
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 })
    }

    // Validate the analysis structure
    if (!analysis || typeof analysis.moodScore !== "number" || !analysis.summary) {
      console.error("Invalid analysis structure:", analysis)
      return NextResponse.json({ error: "Invalid analysis structure" }, { status: 500 })
    }

    // Save journal entry with detailed analysis
    const [journal] = await db
      .insert(JOURNAL_TABLE)
      .values({
        userId, //not able to fetch
        title,
        content,
        moodScore: analysis.moodScore,
        analysis,
      })
      .returning()

    return NextResponse.json({ journal })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const journals = await db
      .select()
      .from(JOURNAL_TABLE)
      .where(eq(JOURNAL_TABLE.userId, Number.parseInt(userId)))
      .orderBy(JOURNAL_TABLE.createdAt)
    return NextResponse.json({ journals })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

