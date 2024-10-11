"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
 import { useToast } from "@/hooks/use-toast";
import ProButton from "../pro/ProButton";
import { signInSchema } from "@/zod/auth.zod";
import { handleCredentialsSignIn } from "@/actions/authAction";
import { Input } from "../ui/input";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleCredentialsSignIn(values);
      if (result?.message) {
        toast({
          title: "Error in sign-in",
          description: "Username/Email: " + values.usernameOrEmail,
        });
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error";

      toast({
        title: "An unexpected error occurred. Please try again.",
      });

      console.log(
        "An unexpected error occurred. Please try again.",
        errorMessage
      );
    }
  };

  return (
    <div className="flex h-auto items-center justify-center bg-background shadow-md  rounded-md shadow-border">
      <div className="w-96 min-w-md space-y-8 rounded-lg bg-background p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            Sign In to App
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-10 w-10 text-gray-500" />
                        ) : (
                          <Eye className="h-10 w-10 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProButton pending={form.formState.isSubmitting} label="Sign in" />
          </form>
        </Form>
      </div>
    </div>
  );
}
