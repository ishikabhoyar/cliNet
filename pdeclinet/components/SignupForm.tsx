"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Define the form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }).optional(),
})

export function SignupForm() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const router = useRouter()
  
  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Redirect to the upload page using Next.js router
    router.push("/upload")
  }

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#DF7373]"></div>
          <div className="w-2 h-2 rounded-full bg-[#DF7373]/80"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Join DeCliNet</h2>
        <p className="text-gray-500 text-sm mb-6">Create your account to get started</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Choose a username" 
                    className="h-12 border border-gray-200 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500 transition-all"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    className="h-12 border border-gray-200 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-indigo-100 focus-visible:border-indigo-500 transition-all"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          
          <div className="pt-3">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#DF7373] to-[#DF7373]/80 hover:to-[#DF7373]/90 text-white h-12 rounded-lg font-medium shadow-lg shadow-[#DF7373]/50 transition-all"
            >
              Get Started
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-5 text-center">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-[#DF7373] hover:text-[#DF7373]/80 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#DF7373] hover:text-[#DF7373]/80 font-medium">
              Privacy Policy
            </Link>.
          </div>
          
          <div className="text-center text-sm mt-4">
            <span className="text-gray-500">Already have an account?</span>{' '}
            <Link href="/login" className="text-[#DF7373] hover:text-[#DF7373]/80 font-medium">
              Log in
            </Link>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}
