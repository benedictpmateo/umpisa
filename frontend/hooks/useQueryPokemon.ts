import { useAppContext } from "@/context/AppContext";
import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";

export const useQueryPokemon = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["pokemons"],
    queryFn: () =>
      graphqlClient.setHeader("Authorization", `Bearer ${(session as any)?.jwt || ''}`).request(
        gql`
          query Pokemons {
            pokemons {
              id
              type
              base {
                HP
                Attack
                Defense
                SpecialAttack
                SpecialDefense
                Speed
              }
              name {
                english
                japanese
              }
            }
            metadata(collection: "pokemon") {
              total
            }
          }
        `
      ),
    enabled: !!(session as any)?.jwt,
  });

  return {
    pokemons: data?.pokemons || [],
    total: data?.metadata ? data?.metadata.total : 0,
    loading: isLoading,
  };
};
