import { NextResponse } from "next/server"
import { db } from "../../../../configs/db"
import { JOURNAL_TABLE } from "../../../../configs/schema"
import { eq } from "drizzle-orm"
import { pdf } from "@react-pdf/renderer"
import JournalPDFReport from "../../../../../components/JournalPDFReport"
import JSZip from "jszip"

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
      .where(eq(JOURNAL_TABLE.userId, Number(userId)))
      .orderBy(JOURNAL_TABLE.createdAt)

    const zip = new JSZip()

    for (const journal of journals) {
      const pdfBlob = await pdf(<JournalPDFReport journal={journal} />).toBlob()
      zip.file(`journal_report_${journal.id}.pdf`, pdfBlob)
    }

    const zipBlob = await zip.generateAsync({ type: "blob" })

    // Set headers for file download
    const headers = new Headers()
    headers.append("Content-Disposition", `attachment; filename="all_journal_reports.zip"`)
    headers.append("Content-Type", "application/zip")

    return new NextResponse(zipBlob, { status: 200, headers })
  } catch (error) {
    console.error("Error generating reports:", error)
    return NextResponse.json({ error: "Error generating reports" }, { status: 500 })
  }
}

