"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSuccess(true)
  }

  const handleTryAgain = () => {
    setIsSuccess(false)
    setFormData({ email: "", phone: "" })
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Link>

          {/* Success Message */}
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">Check Your {resetMethod === "email" ? "Email" : "Phone"}</h1>
            <p className="text-gray-400 mb-8">
              We've sent a password reset link to{" "}
              <span className="text-white font-medium">
                {resetMethod === "email" ? formData.email : formData.phone}
              </span>
            </p>

            <div className="space-y-4">
              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="w-full bg-transparent border-gray-600 text-white hover:bg-gray-800 py-3 rounded-lg font-medium transition-all"
              >
                Try Again
              </Button>
              
              <Link href="/auth/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02]">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Link>

        {/* Forgot Password Form */}
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-black transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-white">ACME STORE</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400">Enter your details to reset your password</p>
          </div>

          {/* Reset Method Toggle */}
          <div className="flex bg-gray-800/50 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setResetMethod("email")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                resetMethod === "email"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setResetMethod("phone")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                resetMethod === "phone"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <Label htmlFor="contact" className="text-white mb-2 block">
                {resetMethod === "email" ? "Email Address" : "Phone Number"}
              </Label>
              <Input
                id="contact"
                type={resetMethod === "email" ? "email" : "tel"}
                placeholder={
                  resetMethod === "email" 
                    ? "Enter your email address" 
                    : "Enter your phone number"
                }
                value={resetMethod === "email" ? formData.email : formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [resetMethod]: e.target.value,
                  }))
                }
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <p className="text-gray-500 text-sm mt-2">
                We'll send you a link to reset your password
              </p>
            </div>

            {/* Reset Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
