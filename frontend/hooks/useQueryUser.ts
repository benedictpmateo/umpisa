import graphqlClient from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useQueryUser = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["user"],
    queryFn: () =>
      graphqlClient.setHeader("Authorization", `Bearer ${(session as any)?.jwt || ''}`).request(
        gql`
          query MyAccount {
            user {
              _id
              firstName
              lastName
              email
            }
          }
        `
      ),
    enabled: !!(session as any)?.jwt,
  });

  useEffect(() => {
    if (error) {
      signOut()
    }
  }, [error])

  return {
    user: data?.user || null,
    loading: isLoading,
  };
};
