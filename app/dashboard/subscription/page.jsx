"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Check, HeartPulse, Sparkles } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
// import { toast } from "@/hooks/use-toast"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    description: "Get started with basic mental health tracking",
    features: [
      "5 Journal entries",
      "Basic AI analysis",
      "Mood tracking",
      "Limited meditation content",
    ],
    isPopular: false,
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "month",
    description: "Enhanced mental health support and analysis",
    features: [
      "Unlimited journal entries",
      "Advanced AI analysis",
      "Detailed mood tracking",
      "Full meditation library",
      "Priority support",
      "Personalized recommendations",
    ],
    isPopular: true,
    buttonText: "Subscribe",
    disabled: false,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$99.99",
    period: "year",
    description: "Save 17% with annual billing",
    features: [
      "All Premium features",
      "Annual mental health report",
      "Exclusive webinars",
      "Advanced analytics",
      "Export data functionality",
    ],
    isPopular: false,
    buttonText: "Subscribe",
    disabled: false,
  },
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const handleSubscribe = async (planId) => {
    setSelectedPlan(planId)
    setIsLoading(true)
    
    try {
      // In a real implementation, this would connect to a payment processor
      // like Stripe and handle the subscription creation
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update user metadata with subscription info
      await user?.update({
        publicMetadata: {
          ...user.publicMetadata,
          subscription: {
            plan: planId,
            status: "active",
            startDate: new Date().toISOString(),
            // In a real implementation, this would come from the payment processor
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }
        }
      })
      
      toast({
        title: "Subscription successful!",
        description: `You've subscribed to the ${planId === "annual" ? "Annual" : "Premium"} plan.`,
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      })
      
      router.push("/dashboard/home")
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Upgrade Your Mental Health Journey
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock unlimited journal entries, advanced AI analysis, and personalized recommendations to support your mental wellbeing.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.isPopular ? "border-purple-400 shadow-lg" : "border-gray-200"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2">
                {plan.id === "basic" ? (
                  <HeartPulse className="h-6 w-6 text-purple-500" />
                ) : (
                  <Sparkles className="h-6 w-6 text-purple-500" />
                )}
                <CardTitle>{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500">/{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.disabled || isLoading || selectedPlan === plan.id}
                className={`w-full ${
                  plan.isPopular 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                    : ""
                }`}
              >
                {isLoading && selectedPlan === plan.id ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  plan.buttonText
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          All plans include a 7-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  )
}
