"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous error and success messages
    setError("")
    setSuccessMessage("")

    // Prepare data for the POST request
    const formData = {
      email,
      firstName,
      lastName,
      password1: password,
      password2: confirmPassword,
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        window.location.href = data.redirect_url
        // Using success message instead of alert
        setSuccessMessage(data.message || "Account created successfully")
      } else {
        // Using error message instead of alert
        setError(data.message || "Sign up failed")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          {/* Back to login link */}
          <div className="self-start mb-6">
            <Link href="/" className="flex items-center text-sm text-teal-600 hover:text-teal-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Image src="/compile.png" alt="Compile Logo" width={160} height={160} priority />
            <h2 className="text-xl font-bold mt-4">Create your account</h2>
            <p className="text-xs text-gray-500 mt-1">DATA-DRIVEN INSIGHTS FOR BETTER CANCER CARE</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            {successMessage && <p className="text-sm text-green-600 mt-2">{successMessage}</p>}

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md transition-colors mt-6"
            >
              Create Account
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/" className="text-teal-600 hover:text-teal-800 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-6 pt-6 mt-6 border-t border-gray-100 w-full">
            <div className="flex items-center text-gray-500">
              <ShieldCheck className="h-4 w-4 mr-1 text-teal-600" />
              <span className="text-xs">Secure</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Heart className="h-4 w-4 mr-1 text-teal-600" />
              <span className="text-xs">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}