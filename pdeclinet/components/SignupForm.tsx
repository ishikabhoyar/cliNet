"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import GoogleSignIn from "./GoogleSignIn"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
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
  
  // State to store the redirect URL
  const [redirectUrl, setRedirectUrl] = useState('')
  
  // Set the redirect URL only on the client side
  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/callback`)
  }, [])
  
  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
        
        {/* Google Sign-In Button */}
        <div className="mb-6">
          <GoogleSignIn 
            redirectUrl={redirectUrl}
          />
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      className="h-11 border-gray-200 focus:border-[#DF7373] focus:ring-[#DF7373]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email"
                      className="h-11 border-gray-200 focus:border-[#DF7373] focus:ring-[#DF7373]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-[#DF7373] hover:bg-[#DF7373]/90 text-white font-medium"
            >
              Create Account
            </Button>
          </form>
        </Form>
        
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-[#DF7373] hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-[#DF7373] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
