import { NextResponse } from "next/server"
import { db } from "../../../../configs/db"
import { JOURNAL_TABLE } from "../../../../configs/schema"
import { sql } from "drizzle-orm"

const ANALYSIS_PROMPT = `You are an expert journal analyst. Your job is to analyze a journal entry and return a JSON object with the following keys:

- moodScore: A number between 1 and 10 that represents the mood of the writer. 1 is very negative, 5 is neutral, and 10 is very positive.
- summary: A detailed and precise summary of the journal entry, write at least 10 lines.
- emotions: An object with two keys:
  - primary: The primary emotion of the writer.
  - secondary: An array of secondary emotions of the writer.
  - intensity: A string that describes the intensity of the emotions.
- topics: An array of topics that the journal entry is about.
- suggestions: An object with the following keys:
  - immediate: A suggestion for the writer to do immediately.
  - longTerm: A suggestion for the writer to do in the long term.
  - activities: An array of activities that the writer can do to improve their mood.
  - resources: An array of resources that the writer can use to improve their mood.

Here is the journal entry:
`

export async function POST(req) {
  try {
    const { userId, title, content } = await req.json()

    // No auth check - we trust the frontend to send the correct userId

    // Use Gemini API to analyze the journal entry
    try {
      // Import the Google Generative AI library
      const { GoogleGenerativeAI } = await import("@google/generative-ai")

      // Initialize with API key
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

      // Updated to use the latest model version with increased timeout
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

      // Increase timeout to 30 seconds for production environment
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("API timeout")), 30000))

      // Generate content with safety settings
      const resultPromise = model.generateContent({
        contents: [{ role: "user", parts: [{ text: ANALYSIS_PROMPT + content }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048, // Limit token output to prevent long responses
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      })

      // Race between the API call and the timeout
      const result = await Promise.race([resultPromise, timeoutPromise])

      const response = result.response
      const rawText = response.text()

      // Handle potential JSON formatting issues
      let jsonContent = rawText.trim()

      // If the response is wrapped in code blocks, remove them
      if (jsonContent.includes("```json")) {
        jsonContent = jsonContent.replace(/```json\s*|\s*```/g, "").trim()
      }

      // Try to find and extract valid JSON if there's extra text
      const jsonMatch = jsonContent.match(/\{[\s\S]*\}/)
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

      // More detailed fallback analysis
      const fallbackAnalysis = {
        moodScore: 5,
        summary:
          "Unable to analyze journal entry due to AI service timeout or error. This is a fallback summary that preserves your journal entry while we work on processing your content. The AI service might be experiencing high demand or temporary issues.",
        emotions: {
          primary: "neutral",
          secondary: ["unavailable"],
          intensity: "Unable to determine due to service limitations",
        },
        topics: ["journal entry"],
        suggestions: {
          immediate:
            "Consider trying again later when the AI service is available. In the meantime, continue to express your thoughts freely.",
          longTerm: "Continue journaling regularly as it's beneficial regardless of AI analysis.",
          activities: [
            "Take a short walk",
            "Practice deep breathing",
            "Connect with a friend",
            "Engage in a hobby you enjoy",
          ],
          resources: ["Basic self-care guide", "Mindfulness practices", "Journaling prompts"],
        },
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
        warning:
          "Used fallback analysis due to AI service error. Your journal has been saved and you can try analyzing it again later.",
      })
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
