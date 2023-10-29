import { useAppContext } from "@/context/AppContext";
import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const useQueryPokemon = () => {
  const { app } = useAppContext();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["pokemons"],
    queryFn: () =>
      graphqlClient.setHeader("Authorization", `Bearer ${app.token}`).request(
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
    enabled: !!app.token,
  });

  return {
    pokemons: data?.pokemons || [],
    total: data?.metadata ? data?.metadata.total : 0,
    loading: isLoading,
  };
};
