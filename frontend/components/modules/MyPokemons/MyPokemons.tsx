"use client";

import { useQueryMyPokemons } from "@/hooks/useQueryMyPokemons";
import PokemonCard, { IPokemonCardItem } from "./PokemonCard";

export default function MyPokemons() {
  const { myPokemons } = useQueryMyPokemons();

  if (myPokemons.length === 0) {
    return <p>You have no pokemons.</p>;
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {myPokemons
        .sort(
          (a: IPokemonCardItem, b: IPokemonCardItem) =>
            Number(b.createdAt) - Number(a.createdAt)
        )
        .map((item: IPokemonCardItem) => (
          <PokemonCard key={item._id} item={item} />
        ))}
    </div>
  );
}
