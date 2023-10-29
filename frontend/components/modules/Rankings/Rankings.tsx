"use client";

import { useQueryRankings } from "@/hooks/useQueryRankings";
import RankingItem from "./RankingItem";

export default function Rankings() {
  const { rankings } = useQueryRankings();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold mb-10">Global Rankings</h1>
      <div className="space-y-2 max-w-[600px] w-full mx-auto">
        {rankings.map((ranking: any, index: number) => (
          <RankingItem key={ranking.userId} ranking={index + 1} {...ranking} />
        ))}
        {rankings.length === 0 && <p>No rankings</p>}
      </div>
    </div>
  );
}
