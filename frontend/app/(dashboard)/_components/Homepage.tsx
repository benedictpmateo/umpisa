"use client";
import { useAppContext } from "@/context/AppContext";
import { useQueryPokemon } from "@/hooks/useQueryPokemon";
import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useEffect } from "react";
import { CatchPokemon } from "./CatchPokemon";
import { ReleasePokemon } from "./ReleasePokemon";
import { useSession } from "next-auth/react";

export const Homepage = () => {
  const { data: session, update } = useSession()

  const { pokemons, total, loading } = useQueryPokemon();

  if (loading || pokemons.length == 0) return null;

  return (
    <div className="grid grid-cols-2">
      <CatchPokemon />
      <ReleasePokemon />
    </div>
  );
};
