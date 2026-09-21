import Image from "next/image";
import Link from "next/link";
import ImageFrame from "./ImageFrame";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="min-h-[70dvh]">
      <Container className="grid grid-cols-1 place-items-center gap-8 py-12 md:grid-cols-2 md:place-items-start md:py-20">
        <div className="space-y-8 self-center">
          <h1 className="flex-col text-4xl leading-tight font-extrabold text-slate-200 md:flex md:text-5xl">
            <span>Loop your habits, </span>
            <span className="bg-linear-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              shape your life.
            </span>
          </h1>
          <p className="text-section-title/relaxed text-slate-400 sm:max-w-[470px]">
            Loopin combines yearly heatmaps, streak freezes, and AI coaching
            into a modern habit tracker built for real consistency, without the
            pressure or streak shaming.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-full bg-linear-to-r from-fuchsia-600 via-violet-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md shadow-violet-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/40 hover:brightness-110"
          >
            Get started
          </Link>
        </div>
        <ImageFrame className="max-w-[470px] md:justify-self-end">
          <Image
            src="/images/heroImage.webp"
            alt="A man checking his progress on the Loopin app in the park"
            width={922}
            height={1152}
            sizes="(max-width: 470px) 100vw, 470px"
            priority
            className="h-auto w-full rounded-lg"
          />
        </ImageFrame>
      </Container>
    </section>
  );
}
