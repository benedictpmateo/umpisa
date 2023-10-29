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
import graphqlClient from "@/lib/graphql";
import { gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { STORAGE_KEY } from "@/utils/constant";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  firstName: z.string().min(1, {
    message: "Firstname is required",
  }),
  lastName: z.string().min(1, {
    message: "lastName is required",
  }),
});

const formFields = [
  { label: "Email address", name: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "First name", name: "firstName" },
  { label: "Last name", name: "lastName" },
];

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: z.infer<typeof formSchema>) =>
      graphqlClient.request(
        gql`
          mutation CreateAccount($body: CreateAccountRequest!) {
            createAccount(body: $body) {
              token
            }
          }
        `,
        {
          body,
        }
      ),
    onSuccess(data: any) {
      localStorage.setItem(STORAGE_KEY.TOKEN, data?.createAccount?.token);
      router.push("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold">Create your account here</h2>
      <p className="mb-10">
        You will be automatically signed-in after you signup here.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((item) => (
          <FormField
            key={item.name}
            name={item.name as any}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={item.label}
                    {...field}
                    type={item?.type}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
}
