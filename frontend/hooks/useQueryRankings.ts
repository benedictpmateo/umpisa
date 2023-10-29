import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";

export const useQueryRankings = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery<any>({
    queryKey: ["rankings"],
    queryFn: () =>
      graphqlClient
        .setHeader("Authorization", `Bearer ${(session as any)?.jwt || ""}`)
        .request(
          gql`
            query MyPokemons {
              rankings{
                userId
                firstName
                lastName
                numberOfPokemons
              }
            }
          `
        ),
    enabled: !!(session as any)?.jwt,
  });

  return {
    rankings: data?.rankings || [],
    loading: isLoading,
  };
};
