import ValentineApp from "./components/ValentineApp";

export default function Home() {
  return (
    <main className="bg-background text-foreground font-sans selection:bg-accent selection:text-white overflow-hidden">
      <ValentineApp />
    </main>
  );
}
