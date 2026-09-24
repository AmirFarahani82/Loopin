import Image from "next/image";
import Container from "./Container";
import ImageFrame from "./ImageFrame";

type Props = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  frameWidth: string;
  reverse?: boolean;
};
export default function Feature({
  id,
  label,
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  frameWidth,
  reverse = false,
}: Props) {
  return (
    <section id={id} className="scroll-mt-16 md:scroll-mt-18">
      <Container
        className={`flex gap-10 max-[1000px]:flex-col min-[1000px]:items-center min-[1000px]:justify-between ${reverse ? "flex-row-reverse" : ""}`}
      >
        <div className="w-full space-y-4 min-[1000px]:max-w-[480px]">
          <span className="inline-block rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 font-semibold tracking-wide text-sky-400">
            {label}
          </span>
          <h2 className="text-heading font-bold text-slate-200">{title}</h2>
          <p className="text-subtitle leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        <ImageFrame
          className={`w-full self-center min-[1000px]:flex-1 ${frameWidth}`}
        >
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 768px) 100vw, 580px"
            className="h-auto w-full rounded-lg"
          />
        </ImageFrame>
      </Container>
    </section>
  );
}
