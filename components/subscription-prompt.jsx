"use client"
import { useRouter } from "next/navigation"
import { Sparkles, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
// import  { SubscriptionStatus } from "@/hooks/use-subscription"


const SubscriptionPrompt=({ status, onClose, variant = "inline" })=> {
  const router = useRouter()

  if (status.isSubscribed) return null

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200 p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <p className="text-sm">
              <span className="font-medium">{status.entriesRemaining} entries remaining.</span> Upgrade to Premium for
              unlimited entries!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-200"
              onClick={() => router.push("/dashboard/subscription")}
            >
              Upgrade
            </Button>
            {onClose && (
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full bg-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <CardTitle>Upgrade to Premium</CardTitle>
              </div>
              {onClose && (
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardDescription>
              You've reached your free entry limit. Upgrade to continue your mental health journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">With Premium, you'll get:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                <span>Unlimited journal entries</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                <span>Advanced AI analysis</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                <span>Personalized recommendations</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                <span>Full meditation library</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Not now
              </Button>
            )}
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => router.push("/dashboard/subscription")}
            >
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Default inline variant
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <CardTitle className="text-lg">Upgrade to Premium</CardTitle>
        </div>
        <CardDescription>
          {status.entriesRemaining > 0
            ? `You have ${status.entriesRemaining} free entries remaining.`
            : "You've reached your free entry limit."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Unlock unlimited entries and advanced AI analysis to continue your mental health journey.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => router.push("/dashboard/subscription")}
        >
          Upgrade Now
        </Button>
      </CardFooter>
    </Card>
  )
}


export default SubscriptionPrompt