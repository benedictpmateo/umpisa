export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full flex">
      <section className="w-full flex justify-center items-center h-full px-4 max-w-[500px] mx-auto">
        {children}
      </section>
    </main>
  );
}
