import { features } from "./components/landing-page/constants";
import Feature from "./components/landing-page/Feature";
import Footer from "./components/landing-page/Footer";
import Header from "./components/landing-page/Header";
import Hero from "./components/landing-page/Hero";
import Principles from "./components/landing-page/Principles";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="space-y-20 md:space-y-30">
        <Hero />
        <Principles />
        {features.map((f, i) => (
          <Feature key={f.id} {...f} reverse={i % 2 !== 0} />
        ))}
      </main>
      <Footer />
    </>
  );
}
