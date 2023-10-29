"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import graphqlClient from "@/lib/graphql";
import { gql } from "graphql-request";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: z.infer<typeof formSchema>) =>
      graphqlClient.request(
        gql`
          mutation LoginAccount($body: LoginAccountRequest!) {
            loginAccount(body: $body) {
              token
            }
          }
        `,
        {
          body,
        }
      ),
    async onSuccess(data: any, variables) {
      const { ok, error, url } = (await signIn("credentials", {
        redirect: false,
        token: data.loginAccount?.token,
        callbackUrl: callbackUrl || "/",
      })) as any;

      if (!ok && error === "CredentialsSignin") {
        form.setError("email", { message: "" });
        form.setError("password", { message: "Invalid credentials" });
      }
      if (ok && url) router.push(url);
    },
    onError(error: any) {
      if (error?.response?.errors) {
        form.setError("email", { message: "" });
        form.setError("password", { message: "Invalid credentials" });
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <h2 className="mb-10 text-2xl font-bold">Login</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
          <Link href="/signup">
            <p className="text-blue-500 text-base font-semibold">
              Create your account
            </p>
          </Link>
        </div>
      </form>
    </Form>
  );
}
