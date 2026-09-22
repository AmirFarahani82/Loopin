import Header from "./components/landing-page/Header";
import Hero from "./components/landing-page/Hero";
import Principles from "./components/landing-page/Principles";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="space-y-12.5">
        <Hero />
        <Principles />
      </main>
    </>
  );
}
