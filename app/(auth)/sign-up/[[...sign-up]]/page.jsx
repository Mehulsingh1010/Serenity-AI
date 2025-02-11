'use client';
import { SignUp } from '@clerk/nextjs';
import React from 'react';
import { Heart } from 'lucide-react';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="max-w-md mx-auto md:max-w-none md:flex md:h-screen">
        {/* Left section - Logo and Features */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-8">
          <div className="max-w-lg w-full space-y-12">
            {/* Logo and Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl  mb-4">
                {/* <Heart className="w-12 h-12 text-white" strokeWidth={1.5} />
                 */}
                 <img src="/logo.png" alt="" />
              </div>
              <h1 className="text-4xl font-bold text-white">Welcome to Serenity AI</h1>
              <p className="text-xl text-white/90">
                Your personal companion for mental well-being and emotional growth
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Daily Reflection</h3>
                  <p className="text-lg text-white/80">Track your emotional journey with AI-powered insights</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Personalized Support</h3>
                  <p className="text-lg text-white/80">Get tailored suggestions for emotional well-being</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Progress Tracking</h3>
                  <p className="text-lg text-white/80">Visualize your growth over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Sign In Form */}
        <div className="md:w-2/5 bg-white">
          <div className="h-full flex items-center justify-center p-8">
            <SignUp
              appearance={{
                elements: {
                  card: 'shadow-none',
                  formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  footerActionLink: 'text-purple-600 hover:text-purple-700',
                  formFieldInput: 'rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500',
                  socialButtonsBlockButton: 'rounded-xl border border-gray-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  socialButtonsIconButton: 'rounded-xl border border-gray-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                  headerTitle: 'text-gray-900',
                  headerSubtitle: 'text-gray-600',
                  formFieldLabel: 'text-gray-700',
                  dividerText: 'text-gray-600',
                  formFieldSuccessText: 'text-green-600',
                  formFieldErrorText: 'text-red-600'
                },
                layout: {
                  shimmer: false,
                  showOptionalFields: false,
                  socialButtonsVariant: 'iconButton'
                },
                variables: {
                  borderRadius: '0.75rem'
                }
              }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cl-internal-b3fm6y {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;