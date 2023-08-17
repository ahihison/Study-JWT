"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./constant";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { loginUser } from "@/redux/apiRequest";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const dispath = useDispatch();
  const router = useRouter();
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      await loginUser(values, dispath, router);
    } catch (e) {
      console.log(e);
    }
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-[50%] h-screen p-32 m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="m-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
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
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 w-full ">
            Continue
          </Button>
          <div className="p-4 text-center">
            <div className="my-2">Don't have an account yet?</div>
            <Link
              href={"/register"}
              className="font-bold text-foreground text-xl text-center"
            >
              Register one for free
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
