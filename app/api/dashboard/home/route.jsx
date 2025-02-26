import { NextResponse } from "next/server"
import { db } from "../../../../configs/db"
import { JOURNAL_TABLE } from "../../../../configs/schema"
import { eq } from "drizzle-orm"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google AI client with API key
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
    
    // Use Gemini API to analyze the journal entry
    try {
      // Updated to use the latest model version - gemini-1.5-pro
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
      
      // Generate content with safety settings and a timeout
      const resultPromise = model.generateContent({
        contents: [{ role: "user", parts: [{ text: ANALYSIS_PROMPT + content }] }],
        generationConfig: {
          temperature: 0.7,
        },
      })
      
      // Add a timeout to the API call
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 15000)
      );
      
      // Race between the API call and the timeout
      const result = await Promise.race([resultPromise, timeoutPromise]);
      
      const response = result.response
      const rawText = response.text()
      
      // Handle potential JSON formatting issues
      let jsonContent = rawText.trim()
      
      // If the response is wrapped in code blocks, remove them
      if (jsonContent.includes("```json")) {
        jsonContent = jsonContent.replace(/```json\s*|\s*```/g, "").trim()
      }
      
      // Try to find and extract valid JSON if there's extra text
      let jsonMatch = jsonContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        jsonContent = jsonMatch[0]
      }
      
      let analysis
      try {
        // Parse the JSON response
        analysis = JSON.parse(jsonContent)
        
        // Validate the analysis structure
        if (!analysis || typeof analysis.moodScore !== "number" || !analysis.summary) {
          throw new Error("Invalid analysis structure")
        }
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError, "Raw content:", jsonContent)
        throw new Error("Failed to parse AI response")
      }
      
      // Save journal entry with detailed analysis
      const [journal] = await db
        .insert(JOURNAL_TABLE)
        .values({
          userId,
          title,
          content,
          moodScore: analysis.moodScore,
          analysis,
        })
        .returning()
        
      return NextResponse.json({ journal })
    } catch (aiError) {
      console.error("AI API Error:", aiError)
      // Fallback analysis if AI service fails
      const fallbackAnalysis = {
        moodScore: 5,
        summary: "Unable to analyze journal entry due to AI service error. This is a fallback summary.",
        emotions: {
          primary: "unknown",
          secondary: ["unavailable"],
          intensity: "Unable to determine"
        },
        topics: ["unavailable"],
        suggestions: {
          immediate: "Consider trying again later when the AI service is available.",
          longTerm: "Continue journaling regularly.",
          activities: ["Take a short walk", "Practice deep breathing"],
          resources: ["Basic self-care guide"]
        }
      }
      
      // Save journal with fallback analysis
      const [journal] = await db
        .insert(JOURNAL_TABLE)
        .values({
          userId,
          title,
          content,
          moodScore: fallbackAnalysis.moodScore,
          analysis: fallbackAnalysis,
        })
        .returning()
        
      return NextResponse.json({ 
        journal,
        warning: "Used fallback analysis due to AI service error. Please try again later."
      })
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    // Import the auth session function
    const { getServerSession } = await import("next-auth/next")
    const { authOptions } = await import("../../../../configs/auth")
    
    // Get the session
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const userId = session.user.id
    
    const journals = await db
      .select()
      .from(JOURNAL_TABLE)
      .where(eq(JOURNAL_TABLE.userId, userId))
      .orderBy(JOURNAL_TABLE.createdAt.desc())
      
    return NextResponse.json({ journals })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}