import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";

export const useQueryMyPokemons = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["my-pokemons"],
    queryFn: () =>
      graphqlClient
        .setHeader("Authorization", `Bearer ${(session as any)?.jwt || ""}`)
        .request(
          gql`
            query MyPokemons {
              myPokemons {
                _id
                pokemon {
                  id
                  name {
                    english
                    japanese
                    chinese
                    french
                  }
                  type
                  base {
                    HP
                    Attack
                    Defense
                    SpecialAttack
                    SpecialDefense
                    Speed
                  }
                }
                createdAt
              }
            }
          `
        ),
    enabled: !!(session as any)?.jwt,
  });

  return {
    myPokemons: data?.myPokemons || [],
    loading: isLoading,
  };
};
