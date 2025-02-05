"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2, TrendingUp, TrendingDown, Activity, Calendar, PenLine } from "lucide-react"
import Link from "next/link"

export default function MoodTrackerPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await fetch("/api/dashboard/mood-tracker")
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch mood data")
        }
        
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMoodData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    )
  }

  // No data handling
  if (!data || !data.moodData || data.moodData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center space-y-6">
        <PenLine className="h-16 w-16 text-muted-foreground" />
        <div>
          <h2 className="text-2xl font-bold mb-2">No Journal Entries Yet</h2>
          <p className="text-muted-foreground mb-4">
            Start tracking your mood by writing a few journals
          </p>
          <Link href="/dashboard/home">
            <Button>
              Create First Entry
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const { moodData, moodStats, monthlyAverages } = data || {}

  const suggestions = {
    high: [
      "Keep up the positive momentum!",
      "Share your joy with others",
      "Document what's working well"
    ],
    medium: [
      "Consider starting a gratitude practice",
      "Try incorporating more physical activity",
      "Connect with friends or family"
    ],
    low: [
      "Remember this feeling is temporary",
      "Consider talking to someone you trust",
      "Focus on small, achievable goals",
      "Practice self-care activities"
    ]
  }

  const currentMoodLevel = moodStats?.average >= 7 ? "high" : moodStats?.average >= 4 ? "medium" : "low"

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track your emotional journey and gain insights from your journal entries
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats?.average.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          
          <CardContent>
            <div className="text-2xl font-bold">{moodStats?.highest}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Mood</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats?.lowest}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats?.totalEntries}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Mood Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="moodScore"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Averages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(monthlyAverages || {}).map(([month, average]) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="font-medium">{month}</span>
                  <span className="text-muted-foreground">{Number(average).toFixed(1)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggestions & Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions[currentMoodLevel].map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}