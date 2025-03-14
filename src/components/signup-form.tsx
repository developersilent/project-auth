"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertTriangle, Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { FormData, FormDataType } from "@/components/types/zod-from";
import { GoogleLogin } from "@/components/google-login";
import { SignUpMutation } from "@/queary-func/signup-query";
import { ErrorToast, SuccessToast } from "@/components/toast";


export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const rhf = useForm<FormDataType>({
    resolver: zodResolver(FormData),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { errors, dirtyFields } = rhf.formState;

  const { mutateAsync, isPending } = SignUpMutation()
  const submitForm = async (data: FormDataType) => {
    const res = await mutateAsync(data);
    if (res.isSuccess) {
      SuccessToast(res.Message);
    } else {
      ErrorToast(res.Message);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-9 lg:px-8">
      {/* Logo */}
      <div className="my-7 flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-3 text-center text-[18px] font-bold text-gray-800">
          Sign up to countinue
        </h2>
      </div>

      {/* Google Login */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleLogin />
      </div>

      {/* Divider */}
      <div className="relative my-7 select-none border-t bg-background sm:mx-auto sm:w-full sm:max-w-sm">
        <span className="absolute -top-3 right-[46%] bg-white p-1 px-3 text-xs text-gray-600">
          OR
        </span>
      </div>

      {/* Form */}
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...rhf}>
          <form
            onSubmit={rhf.handleSubmit(submitForm)}
            className="flex flex-col gap-2.5"
          >
            <div className="space-y-[18px]">
              {/* Username Input */}
              <FormField
                control={rhf.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isPending}
                          id="username"
                          type="username"
                          autoComplete="off"
                          placeholder="Username"
                          className={`rounded-xl lowercase outline-none border-1 border-border text-xs px-5 placeholder:text-[11px] max-sm:h-11 transition-all duration-200 ${errors.username ? "focus-visible:border-destructive pr-[41px]" : null}`}
                          {...field}
                        />
                        {errors.username && (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertTriangle
                              size={15}
                              className="text-red-600"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10px] text-red-500 transition-opacity duration-200 ease-in-out" />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={rhf.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isPending}
                          id="password"
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={`rounded-xl outline-none border-1 border-border text-xs pl-4 pr-[41px] placeholder:text-[11px] max-sm:h-11 transition-all duration-200 ${errors.password ? "focus-visible:border-destructive" : null}`}
                          {...field}
                        />
                        {errors.password ? (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertTriangle
                              size={15}
                              className="text-red-600"
                            />
                          </div>
                        ) : (
                          dirtyFields.password && (
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] cursor-pointer place-content-center rounded-full"
                            >
                              {showPassword ? (
                                <Eye size={15} className="text-zinc-800" />
                              ) : (
                                <EyeOff
                                  size={15}
                                  className="text-zinc-800"
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10px] text-red-500 transition-opacity duration-300 ease-in-out" />
                  </FormItem>
                )}
              />
            </div>


            {/* Submit Button */}
            <div className="my-4">
              <Button
                disabled={isPending}
                type="submit"
                className="flex cursor-pointer w-full rounded-xl border border-border bg-primary px-4 py-2 max-sm:h-11 transition-all duration-200 hover:bg-primary-dark"
              >
                {
                  isPending ? (
                    <Loader2 size={30} className="animate-spin duration-[370ms]" />
                  )
                    : (<span className="text-sm text-primary-foreground">Sign Up</span>
                    )
                }
              </Button>
            </div>
          </form>
        </Form>

        {/* Sign Up Link */}
        <p className="mt-1 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-indigo-600 underline hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
