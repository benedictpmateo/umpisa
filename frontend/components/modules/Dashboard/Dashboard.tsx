"use client";
import DashboardCard from "./DashboardCard";

const content = [
  {
    title: "Escape or Catch",
    description: "Escape or Catch a pokemon. Gotta catch 'em all!",
    content: "Visit this page to collect all of the pokemon in the pokedex",
    url: '/catch-pokemon'
  },
  {
    title: "My Pokemons",
    description: "List of my pokemons",
    content: "Visit this page to view all of your collected pokemons from Escape or Catch page",
    url: '/my-pokemons'
  },
  {
    title: 'Rankings',
    description: "Global rankings of all user",
    content: "Visit this page to view the rankings of all players",
    url: "/rankings"
  }
];

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {content.map((item) => (
        <DashboardCard key={item.title} {...item} />
      ))}
    </div>
  );
}
