"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShieldCheck } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (response.ok) {
        window.location.href = "/home"
      } else {
        setError(data.message || "Login failed")
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
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Image src="/compile.png" alt="Compile Logo" width={160} height={160} priority />
            <p className="text-xs text-gray-500 mt-3">DATA-DRIVEN INSIGHTS FOR BETTER CANCER CARE</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-4">
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
            </div>

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md transition-colors mt-6"
            >
              Login
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-teal-600 hover:text-teal-800 font-medium">
                  Sign up here
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
