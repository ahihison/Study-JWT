"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./constant";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/redux/apiRequest";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
      username: "",
    },
  });
  // 2. Define a submit handler.
  const dispath = useDispatch();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    registerUser(values, dispath, router);
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
            name="email"
            render={({ field }) => (
              <FormItem className="m-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your user name" {...field} />
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
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
