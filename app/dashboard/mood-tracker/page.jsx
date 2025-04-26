"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Loader2, TrendingUp, TrendingDown, Activity, Calendar, PenLine, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function MoodTrackerPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('weekly') 

  const fetchMoodData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/dashboard/mood-tracker")
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch mood data")
      }
      
      // Process and format the dates
      if (result.moodData && result.moodData.length > 0) {
        result.moodData = result.moodData.map(entry => {
          // Ensure date is properly parsed as Date object
          const dateObj = new Date(entry.date)
          return {
            ...entry,
            // Store formatted date for display
            date: formatDate(dateObj),
            // Store raw date for filtering and sorting
            rawDate: dateObj
          }
        })
        
        // Sort by date
        result.moodData.sort((a, b) => a.rawDate - b.rawDate)
      }
      
      setData(result)
    } catch (err) {
      console.error("Error in mood tracker:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMoodData()
  }, [])

  // Format date based on the selected view
  const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date"
    }
    
    switch (view) {
      case 'weekly':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case 'monthly':
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      case 'yearly':
        return date.getFullYear().toString()
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Update display dates when view changes
  useEffect(() => {
    if (data && data.moodData) {
      const updatedMoodData = data.moodData.map(entry => ({
        ...entry,
        date: formatDate(entry.rawDate)
      }))
      
      setData(prevData => ({
        ...prevData,
        moodData: updatedMoodData
      }))
    }
  }, [view])

  // Filter data based on view
  const getFilteredData = () => {
    if (!data || !data.moodData) return []
    
    const now = new Date()
    let filtered
    
    switch (view) {
      case 'weekly':
        // Last 7 days
        const weekAgo = new Date(now)
        weekAgo.setDate(now.getDate() - 7)
        filtered = data.moodData.filter(item => item.rawDate >= weekAgo)
        break
      case 'monthly':
        // Last 30 days
        const monthAgo = new Date(now)
        monthAgo.setDate(now.getDate() - 30)
        filtered = data.moodData.filter(item => item.rawDate >= monthAgo)
        break
      case 'yearly':
        // Current year
        filtered = data.moodData.filter(item => 
          item.rawDate.getFullYear() === now.getFullYear()
        )
        break
      default:
        filtered = data.moodData
    }
    
    // Make sure we have valid data for recharts
    return filtered.map(item => ({
      ...item,
      moodScore: Number(item.moodScore) // Ensure moodScore is a number
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-red-500 space-y-4">
        <div className="p-6 rounded-lg bg-red-50 border border-red-200 max-w-md text-center">
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            onClick={fetchMoodData}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </div>
      </div>
    )
  }

  // No data handling
  if (!data || !data.moodData || data.moodData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center space-y-6 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
        <div className="p-6 bg-white rounded-full shadow-md">
          <PenLine className="h-16 w-16 text-purple-400" />
        </div>
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-purple-800">No Journal Entries Yet</h2>
          <p className="text-purple-600 mb-6">
            Start tracking your mood by writing journal entries. Your emotional journey begins with a single thought.
          </p>
          <Link href="/dashboard/home">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              Create Your First Entry
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const { moodData, moodStats, monthlyAverages } = data || {}
  const filteredData = getFilteredData()

  const colorByMoodLevel = (score) => {
    if (score >= 7) return "text-green-500"
    if (score >= 4) return "text-amber-500"
    return "text-red-500"
  }

  const cardBgByMoodLevel = (score) => {
    if (score >= 7) return "from-green-50 to-emerald-50 border-green-100"
    if (score >= 4) return "from-amber-50 to-yellow-50 border-amber-100"
    return "from-red-50 to-rose-50 border-red-100"
  }

  const suggestions = {
    high: [
      "Keep up the positive momentum!",
      "Share your joy with others",
      "Document what's working well",
      "Consider mentoring others who might benefit from your experience"
    ],
    medium: [
      "Consider starting a gratitude practice",
      "Try incorporating more physical activity",
      "Connect with friends or family",
      "Explore mindfulness practices to enhance your mood awareness"
    ],
    low: [
      "Remember this feeling is temporary",
      "Consider talking to someone you trust",
      "Focus on small, achievable goals",
      "Practice self-care activities",
      "Don't hesitate to seek professional support if needed"
    ]
  }

  const currentMoodLevel = moodStats?.average >= 7 ? "high" : moodStats?.average >= 4 ? "medium" : "low"

  // Debug data
  console.log("Filtered data:", filteredData)

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-purple-800">Mood Tracker</h1>
        <p className="text-purple-600">
          Track your emotional journey and gain insights from your journal entries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={`overflow-hidden shadow-md bg-gradient-to-br ${cardBgByMoodLevel(moodStats?.average)}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Activity className={`h-4 w-4 ${colorByMoodLevel(moodStats?.average)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${colorByMoodLevel(moodStats?.average)}`}>
              {moodStats?.average.toFixed(1)}
            </div>
            <p className="text-sm text-gray-500 mt-1">on a scale of 0-10</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{moodStats?.highest}</div>
            <p className="text-sm text-gray-500 mt-1">peak emotional state</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-md bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Mood</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{moodStats?.lowest}</div>
            <p className="text-sm text-gray-500 mt-1">challenging moment</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-md bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{moodStats?.totalEntries}</div>
            <p className="text-sm text-gray-500 mt-1">reflective moments</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="col-span-4 shadow-lg border-indigo-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-indigo-700">Mood Over Time</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={view === 'weekly' ? "default" : "outline"} 
                size="sm"
                onClick={() => setView('weekly')}
                className={view === 'weekly' ? "bg-indigo-600 text-white" : "text-indigo-600 border-indigo-200"}
              >
                Weekly
              </Button>
              <Button 
                variant={view === 'monthly' ? "default" : "outline"} 
                size="sm"
                onClick={() => setView('monthly')}
                className={view === 'monthly' ? "bg-indigo-600 text-white" : "text-indigo-600 border-indigo-200"}
              >
                Monthly
              </Button>
              <Button 
                variant={view === 'yearly' ? "default" : "outline"} 
                size="sm"
                onClick={() => setView('yearly')}
                className={view === 'yearly' ? "bg-indigo-600 text-white" : "text-indigo-600 border-indigo-200"}
              >
                Yearly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={filteredData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fill: '#666' }}
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 10]} 
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fill: '#666' }}
                tickCount={6}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '10px'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}
                formatter={(value) => [`${value}`, 'Mood Score']}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Line
                name="Mood Score"
                type="monotone"
                dataKey="moodScore"
                stroke="#8884d8"
                strokeWidth={3}
                activeDot={{ r: 6, fill: '#8884d8', stroke: '#fff', strokeWidth: 2 }}
                dot={{ r: 4, fill: '#8884d8', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Monthly Averages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(monthlyAverages || {}).length > 0 ? (
                Object.entries(monthlyAverages || {}).map(([month, average]) => (
                  <div key={month} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">{month}</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" 
                        style={{ width: '100px' }}
                      >
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${(average / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-blue-700 font-semibold">{Number(average).toFixed(1)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-500">
                  Not enough data to show monthly averages yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-purple-700">Suggestions & Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className={`text-lg font-semibold mb-3 ${colorByMoodLevel(moodStats?.average)}`}>
                {currentMoodLevel === "high" ? "Positive Momentum" : 
                 currentMoodLevel === "medium" ? "Balanced State" : "Seeking Improvement"}
              </h3>
              <div className="space-y-3">
                {suggestions[currentMoodLevel].map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <div className={`h-2 w-2 mt-2 rounded-full ${colorByMoodLevel(moodStats?.average)}`} />
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}