import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQueryPokemon } from "@/hooks/useQueryPokemon";
import Image from "next/image";
import { useEffect, useState } from "react";

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const CatchPokemon = () => {
  const { pokemons, total } = useQueryPokemon();
  const [escaping, setEscaping] = useState(false);
  const [randomId, setRandomId] = useState(getRndInteger(1, total));

  const generateNewPokemon = () => {
    setEscaping(true)
    setTimeout(() => {
      setEscaping(false);
      setRandomId(getRndInteger(1, total));
    }, 2000)
  };

  const catchPokemon = (id) => {
    //
  };

  const pokemon = pokemons.find((item: any) => item.id === randomId);

  useEffect(() => {
    if (!pokemon) generateNewPokemon();
  }, [pokemon]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Pokemon Pool</h1>
      <p>Escape or Catch the pokemon!</p>

      <div className="flex flex-col items-center gap-y-10">
        {(!!pokemon && !escaping) && (
          <div className="flex flex-col justify-center items-center gap-y-2">
            <Image
              src={`/assets/pokedex/${String(randomId).padStart(3, "0")}MS.png`}
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
              <p className="text-sm font-semibold mb-2">Attributes</p>
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
                  <span className="font-semibold">{pokemon.base.Defense}</span>
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

        {escaping && <div className="min-h-[370px] flex items-center justify-center">
          <p>Escaping pokemon....please wait...</p>
        </div>}
        <div className="flex gap-x-4">
          <Button disabled={escaping} variant="destructive" onClick={() => generateNewPokemon()}>
            {escaping ? 'Escaping...' : 'Escape Encounter'}
          </Button>
          <Button disabled={escaping} onClick={() => catchPokemon(randomId)}>Throw Pokeball</Button>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <p className="max-w-[400px] mx-auto">
          To catch another Pokémon, use the <b>&apos;Escape&apos; button</b> to exit
          the current encounter, and press the <b>&apos;Throw Pokeball&apos;</b> button
          to catch the pokemon.
        </p>
      </div>
    </div>
  );
};
