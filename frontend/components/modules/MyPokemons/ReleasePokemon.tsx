"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import graphqlClient from "@/lib/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export const ReleasePokemon = ({
  name,
  userPokemonId,
}: {
  name: string;
  userPokemonId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["release-pokemon"],
    mutationFn: (id) =>
      graphqlClient
        .setHeader("Authorization", `Bearer ${(session as any)?.jwt || ""}`)
        .request(
          gql`
            mutation ReleasePokemon($userPokemonId: String!) {
              releasePokemon(userPokemonId: $userPokemonId) {
                status
              }
            }
          `,
          {
            userPokemonId: id,
          }
        ),
    onSuccess(data) {
      if (data) {
        toast.success("Successfully release pokemon " + name);
      }
      setOpen(false);
      client.invalidateQueries({ queryKey: ["my-pokemons"] });
    },
    onError(error) {
      console.log(error);
    },
  });

  const onRelease = () => {
    mutate(userPokemonId as any);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="destructive" size="sm">
          Release pokemon
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription className="pt-2">
            This action cannot be undone. This will permanently remove{" "}
            <b>{name}</b> to your collection.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={isPending} variant="destructive" onClick={() => onRelease()}>
            Release
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
