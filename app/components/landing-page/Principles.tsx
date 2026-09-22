import Container from "./Container";
import PrinciplesList from "./PrinciplesList";

export default function Principles() {
  return (
    <section id="principles" className="scroll-mt-16 md:scroll-mt-18">
      <Container className="grid grid-cols-1 justify-items-center gap-10">
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="text-center text-3xl font-bold text-slate-200">
            Built for sustainable consistency
          </h2>
          <p className="max-w-[600px] text-center text-xl text-slate-400">
            We believe habits are built through honest data and self-compassion,
            no pressure or streak shaming.
          </p>
        </div>
        <ol className="flex flex-wrap justify-center gap-4">
          <PrinciplesList />
        </ol>
      </Container>
    </section>
  );
}
