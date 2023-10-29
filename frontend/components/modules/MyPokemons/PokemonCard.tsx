import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReleasePokemon } from "./ReleasePokemon";
import { createPokemonAvatarUrl } from "@/lib/avatar";

export interface IPokemonCardItem {
  _id: string;
  pokemon: {
    id: number;
    name: {
      english: string;
      japanese: string;
      chinese: string;
      french: string;
    };
    type: string[];
    base: {
      HP: number;
      Attack: number;
      Defense: number;
      SpecialAttack: number;
      SpecialDefense: number;
      Speed: number;
    };
  };
  createdAt: string;
}

export default function PokemonCard({ item }: { item: IPokemonCardItem }) {
  return (
    <div className="rounded-lg border border-b p-4 hover:shadow-xl hover:shadow-foreground/10 transition-all">
      <div className="text-center">
        <h2>{item.pokemon.name.english}</h2>
        <p className="text-xs">{item.pokemon.name.japanese}</p>
      </div>
      <Image
        src={createPokemonAvatarUrl(item.pokemon.id)}
        alt={item.pokemon.name.english}
        width={108}
        height={108}
        className="mx-auto"
      />
      <div className="flex gap-2 justify-center my-4">
        {item.pokemon.type.map((type) => (
          <Badge key={type}>{type}</Badge>
        ))}
      </div>
      <p className="text-sm font-semibold">Caught at:</p>
      <p className="text-xs">
        {new Date(Number(item.createdAt)).toLocaleDateString("en-US", {
          year: "numeric", //  values: 'numeric', '2-digit'
          month: "short", //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
          day: "numeric", //  values: 'numeric', '2-digit'
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <div className="mt-4 flex justify-end">
        <ReleasePokemon name={item.pokemon.name.english} userPokemonId={item._id} />
      </div>
    </div>
  );
}
