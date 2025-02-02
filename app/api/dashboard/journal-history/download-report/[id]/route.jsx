import { NextResponse } from "next/server"
import { db } from "@/configs/db"
import { JOURNAL_TABLE } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { pdf } from "@react-pdf/renderer"
import JournalPDFReport from "@/components/JournalPDFReport"

export async function GET(req, { params }) {
  const { id } = params

  try {
    const [journal] = await db
      .select()
      .from(JOURNAL_TABLE)
      .where(eq(JOURNAL_TABLE.id, Number(id)))

    if (!journal) {
      return NextResponse.json({ error: "Journal not found" }, { status: 404 })
    }

    const pdfBlob = await pdf(<JournalPDFReport journal={journal} />).toBlob()

    // Set headers for file download
    const headers = new Headers()
    headers.append("Content-Disposition", `attachment; filename="journal_report_${id}.pdf"`)
    headers.append("Content-Type", "application/pdf")

    return new NextResponse(pdfBlob, { status: 200, headers })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "Error generating report" }, { status: 500 })
  }
}

