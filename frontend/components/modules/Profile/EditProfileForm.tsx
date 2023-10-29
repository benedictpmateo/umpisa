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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryUser } from "@/hooks/useQueryUser";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
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
  { label: "First name", name: "firstName" },
  { label: "Last name", name: "lastName" },
];

export default function EditProfileForm() {
  const router = useRouter();
  const client = useQueryClient();
  const { user } = useQueryUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: z.infer<typeof formSchema>) =>
      graphqlClient.request(
        gql`
          mutation UpdateAccount($body: UpdateAccountRequest!) {
            updateAccount(body: $body) {
              status
            }
          }
        `,
        {
          body: {
            ...body,
            userId: user._id
          },
        }
      ),
    onSuccess(data: any, variables) {
      toast.success('Successfully updated account: ' + variables.email)
      client.invalidateQueries({ queryKey: ['user'] })
      client.invalidateQueries({ queryKey: ['rankings'] })
    },
    onError(error: any) {
      toast.error(error?.response?.errors[0].message)
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(user._id)
    mutate(values);
  }

  return (
    <Form {...form}>
      <h2 className="mb-10 text-2xl font-bold">Create your account here</h2>
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isPending}>
          Update Account
        </Button>
      </form>
    </Form>
  );
}
