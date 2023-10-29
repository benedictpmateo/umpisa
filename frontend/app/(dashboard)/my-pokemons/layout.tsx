"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">My Pokemons</h1>
      {children}
    </div>
  );
}
