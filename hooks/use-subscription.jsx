"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"



export function useSubscription() {
  const { user, isLoaded } = useUser()
  const [status, setStatus] = useState({
    isSubscribed: false,
    plan: null,
    entriesUsed: 0,
    entriesLimit: 5, // Free tier limit
    entriesRemaining: 5,
    showUpgradePrompt: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSubscriptionStatus() {
      if (!isLoaded || !user) return

      try {
        // Check if user has subscription in metadata
        const subscriptionData = user.publicMetadata.subscription;
        const isSubscribed = subscriptionData?.status === "active"

        // Count user's journal entries
        const response = await fetch("/api/dashboard/journal-count")
        if (!response.ok) {
          throw new Error(`Failed to fetch journal count: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format: Expected JSON");
        }

        const { count } = await response.json();

        const entriesLimit = isSubscribed ? Number.POSITIVE_INFINITY : 5
        const entriesRemaining = Math.max(0, entriesLimit - count)

        setStatus({
          isSubscribed,
          plan: subscriptionData?.plan || null,
          entriesUsed: count,
          entriesLimit,
          entriesRemaining,
          showUpgradePrompt: !isSubscribed && entriesRemaining <= 0,
        })
      } catch (error) {
        console.error("Error checking subscription status:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSubscriptionStatus()
  }, [user, isLoaded])

  return { status, loading }
}
