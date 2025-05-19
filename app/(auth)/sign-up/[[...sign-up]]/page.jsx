"use client";
import { SignUp } from "@clerk/nextjs";
import { Heart, PenLine } from "lucide-react";
import Link from "next/link";
const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-[#fff9e6] flex flex-col">
      {/* Notebook paper background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#e6e6fa 1px, transparent 1px)`,
          backgroundSize: "100% 24px",
          opacity: 0.3,
        }}
      ></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row flex-1 p-4 relative z-10">
        {/* Left section - Logo and brand content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-4 md:p-8">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-14 h-14  rounded-md flex items-center justify-center">
              <Link href="/">
                <div className="relative">
                  <img
                    src="/logo1.png"
                    alt="Serenity AI Logo"
                    className="w-16 h-16 object-contain rounded-md shadow"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Brand content */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-700 mb-3 text-center md:text-left">
            Serenity AI
          </h1>
          <div className="bg-yellow-200 px-3 py-1 mb-6 inline-block">
            <p className="text-lg sm:text-xl text-gray-800">
              Your personal journal for emotional well-being
            </p>
          </div>

          {/* Welcome message */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 max-w-md w-full">
            <h2 className="text-xl text-purple-700 font-medium mb-2">
              Dear Friend,
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to your personal space for reflection and growth. Serenity
              AI is like having a thoughtful companion who listens, understands,
              and guides you through your emotional journey.
            </p>
            <p className="text-gray-700">
              Write your thoughts, track your moods, and discover insights that
              help you understand yourself better. Let's begin this journey
              together.
            </p>
          </div>

          {/* Decorative elements - visible on larger screens */}
          <div className="absolute top-20 right-1/4 rotate-12 hidden md:block">
            <div className="w-32 h-8 bg-purple-200 rounded-sm opacity-60"></div>
          </div>
          <div className="absolute bottom-1/4 right-1/3 rotate-6 hidden md:block">
            <div className="w-40 h-40 bg-pink-200 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Right section - Sign Up Form with notebook style */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 sm:p-4 md:p-8 mt-6 md:mt-0">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-md sm:max-w-sm md:max-w-md relative overflow-hidden flex flex-col">
            {/* Paper clip */}
            <div className="absolute -top-2 right-8 transform rotate-12 z-20">
              <div className="w-3 h-12 bg-gray-300 rounded-full"></div>
            </div>

            {/* Ruled lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#e6e6fa 1px, transparent 1px)`,
                backgroundSize: "100% 24px",
                backgroundPosition: "0 8px",
                opacity: 0.4,
              }}
            ></div>

            {/* Clerk SignUp component */}
            <div className="relative z-10 p-2 sm:p-4 md:p-6 w-full">
              <SignUp
                appearance={{
                  elements: {
                    footer: "hidden",
                    card: "shadow-none bg-transparent w-full",
                    formButtonPrimary:
                      "bg-purple-600 hover:bg-purple-700 w-full",
                    formFieldInput:
                      "border-gray-300 focus:border-purple-500 focus:ring-purple-400 w-full",
                    headerTitle: "text-purple-700 font-bold",
                    headerSubtitle: "text-gray-600",
                  },
                }}
              />

              {/* Additional sign-in link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="text-purple-600 hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
