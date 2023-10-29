/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQueryPokemon } from "@/hooks/useQueryPokemon";
import { createPokemonAvatarUrl } from "@/lib/avatar";
import graphqlClient from "@/lib/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const CatchPokemon = () => {
  const client = useQueryClient();
  const { data: session } = useSession();
  const { pokemons, total } = useQueryPokemon();
  const [escaping, setEscaping] = useState(false);
  const [caught, setCaught] = useState(false);
  const [randomId, setRandomId] = useState(getRndInteger(1, total));

  const generateNewPokemon = () => {
    setEscaping(true);
    setTimeout(() => {
      setEscaping(false);
      setRandomId(getRndInteger(1, total));
    }, 2000);
  };

  const generateNewPokemonAfterCatch = () => {
    setCaught(true);
    setTimeout(() => {
      setCaught(false);
      setRandomId(getRndInteger(1, total));
    }, 3000);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["catch-pokemon"],
    mutationFn: (pokedexId: number) =>
      graphqlClient
        .setHeader("Authorization", `Bearer ${(session as any)?.jwt || ""}`)
        .request(
          gql`
            mutation CatchPokemon($pokedexId: Int!) {
              catchPokemon(pokedexId: $pokedexId) {
                pokemon {
                  id
                  name {
                    english
                    japanese
                  }
                }
              }
            }
          `,
          {
            pokedexId,
          }
        ),
    onSuccess(data: any, variables, context) {
      if (data) {
        toast.success(
          "Successfully caught pokemon " +
            data.catchPokemon.pokemon.name.english
        );
      }
      client.invalidateQueries({ queryKey: ["my-pokemons"] });
      client.invalidateQueries({ queryKey: ["rankings"] });
      generateNewPokemonAfterCatch();
    },
    onError(error) {
      console.log(error);
    },
  });

  const catchPokemon = (id: number) => {
    mutate(id);
  };

  const pokemon = pokemons.find((item: any) => item.id === randomId);

  useEffect(() => {
    if (pokemons.length && !pokemon) generateNewPokemon();
  }, [pokemon, pokemons]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Escape or Catch the Pokemon!</h1>
      <p>shows a random pokemon everytime...</p>

      <div className="flex flex-col items-center gap-y-10">
        <div className="min-h-[370px]">
          {!!pokemon && !escaping && !caught && (
            <div className="flex flex-col justify-center items-center gap-y-2">
              <Image
                src={createPokemonAvatarUrl(randomId)}
                alt={pokemon.name.english}
                width={108}
                height={108}
              />
              <div className="text-center">
                <p className="text-sm">{pokemon.name.english}</p>
                <p>{pokemon.name.japanese}</p>
              </div>
              <div className="flex gap-4">
                {pokemon.type.map((item: string) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold mb-2">Stats</p>
                <ul className="text-center">
                  <li>
                    Health:{" "}
                    <span className="font-semibold">{pokemon.base.HP}</span>
                  </li>
                  <li>
                    Attack:{" "}
                    <span className="font-semibold">{pokemon.base.Attack}</span>
                  </li>
                  <li>
                    Defense:{" "}
                    <span className="font-semibold">
                      {pokemon.base.Defense}
                    </span>
                  </li>
                  <li>
                    Special Attack:{" "}
                    <span className="font-semibold">
                      {pokemon.base.SpecialAttack}
                    </span>
                  </li>
                  <li>
                    Special Defense:{" "}
                    <span className="font-semibold">
                      {pokemon.base.SpecialDefense}
                    </span>
                  </li>
                  <li>
                    Speed:{" "}
                    <span className="font-semibold">{pokemon.base.Speed}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {escaping && (
            <div className="min-h-[370px] flex items-center justify-center">
              <p>Escaping pokemon....please wait...</p>
            </div>
          )}
          {caught && (
            <div className="min-h-[370px] flex items-center justify-center">
              <p>Congratulations! You caught {pokemon.name.english}!!!</p>
            </div>
          )}
        </div>
        <div className="flex gap-x-4">
          <Button
            disabled={escaping}
            variant="destructive"
            onClick={() => generateNewPokemon()}
          >
            {escaping ? "Escaping..." : "Escape Encounter"}
          </Button>
          <Button disabled={escaping} onClick={() => catchPokemon(randomId)}>
            Throw Pokeball
          </Button>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <p className="max-w-[400px] mx-auto">
          Use the <b>&apos;Escape Encounter&apos;</b> button to exit the current
          pokemon encounter, and press the <b>&apos;Throw Pokeball&apos;</b>{" "}
          button to catch the pokemon.
        </p>
      </div>
    </div>
  );
};
