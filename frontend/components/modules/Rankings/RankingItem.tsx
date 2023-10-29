import { useQueryUser } from "@/hooks/useQueryUser";
import { cn } from "@/lib/utils";

export default function RankingItem({
  ranking,
  userId,
  firstName,
  lastName,
  numberOfPokemons,
}: {
  ranking: number
  userId: string;
  firstName: string;
  lastName: string;
  numberOfPokemons: number;
}) {
  const { user } = useQueryUser();

  if (!user) return null;

  return (
    <div className={cn("flex border border-border rounded-sm p-4 justify-between", {
      'shadow-xl shadow-cyan-500/50' :ranking === 1,
      'shadow-xl shadow-blue-500/50' :ranking === 2,
      'shadow-xl shadow-indigo-500/50' :ranking === 3,
      'bg-primary text-secondary': user._id === userId
    })}>
      <div className="flex gap-x-10">
        <p className="text-2xl font-semibold"><span className="text-xs mr-1">Rank</span>{ranking}</p>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <p className="text-2xl">{numberOfPokemons} <span className="text-sm">pokemons</span></p>
    </div>
  );
}
