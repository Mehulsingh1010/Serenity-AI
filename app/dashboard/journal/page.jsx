"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DownloadCloud, FileText, ThumbsUp, ThumbsDown } from "lucide-react"
import { pdf } from "@react-pdf/renderer"
import JournalPDFReport from "@/components/JournalPDFReport"
import JSZip from "jszip"
import { useToast } from "@/hooks/use-toast"

export default function JournalHistory() {
  const [journals, setJournals] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [selectedMood, setSelectedMood] = useState("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/dashboard/home?userId=1")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!data.journals) {
        throw new Error("No journals data received")
      }
      setJournals(data.journals)
    } catch (error) {
      console.error("Error fetching journals:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch journals. Please try again later.",
      })
      setJournals([])
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedJournals = useMemo(() => {
    return journals
      .filter((journal) => {
        const matchesSearch =
          journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          journal.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesMood =
          selectedMood === "all" ||
          (selectedMood === "positive" && journal.moodScore > 5) ||
          (selectedMood === "negative" && journal.moodScore <= 5)
        return matchesSearch && matchesMood
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return new Date(a.createdAt) - new Date(b.createdAt)
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
      })
  }, [journals, searchTerm, selectedMood, sortOrder])

  const generatePDF = async (journal) => {
    try {
      const blob = await pdf(<JournalPDFReport journal={journal} />).toBlob()
      return blob
    } catch (error) {
      console.error("Error generating PDF:", error)
      throw new Error("Failed to generate PDF report")
    }
  }

  const handleDownloadReport = async (journal) => {
    try {
      const blob = await generatePDF(journal)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `journal_report_${journal.id}.pdf`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      toast({
        title: "Success",
        description: "Report downloaded successfully",
      })
    } catch (error) {
      console.error("Error downloading report:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to download report. Please try again.",
      })
    }
  }

  const handleDownloadAllReports = async () => {
    try {
      const allBlobs = await Promise.all(filteredAndSortedJournals.map(generatePDF))
      const zip = new JSZip()

      allBlobs.forEach((blob, index) => {
        zip.file(`journal_report_${filteredAndSortedJournals[index].id}.pdf`, blob)
      })

      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "all_journal_reports.zip"
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      toast({
        title: "Success",
        description: "All reports downloaded successfully",
      })
    } catch (error) {
      console.error("Error downloading all reports:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to download reports. Please try again.",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Journal History
      </motion.h1>

      <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700">Filters and Options</CardTitle>
          <CardDescription>Customize your journal view</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMood} onValueChange={(value) => setSelectedMood(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Moods</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleDownloadAllReports}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            disabled={filteredAndSortedJournals.length === 0}
          >
            <DownloadCloud className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent>
          {filteredAndSortedJournals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedJournals.map((journal) => (
                  <TableRow key={journal.id}>
                    <TableCell>{format(new Date(journal.createdAt), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{journal.title}</TableCell>
                    <TableCell>
                      {journal.moodScore > 5 ? (
                        <ThumbsUp className="text-green-500" />
                      ) : (
                        <ThumbsDown className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadReport(journal)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || selectedMood !== "all"
                ? "No journals match your search criteria"
                : "No journals found. Start writing your first journal entry!"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

