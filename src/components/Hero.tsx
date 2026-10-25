import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[min(100vh,920px)] overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0" aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/workout-group-selfie.jpg"
          className="h-full w-full object-cover object-center motion-reduce:hidden"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <Image
          src="/images/workout-group-selfie.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%] motion-reduce:block hidden"
          sizes="100vw"
          aria-hidden
        />
      </div>

      {/* Dark overlay for headline readability */}
      <div className="absolute inset-0 bg-charcoal/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/40"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(100vh,920px)] max-w-content flex-col justify-center px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36">
        <div className="flex max-w-3xl gap-4 sm:gap-5">
          <div className="mt-2 w-1 shrink-0 self-stretch bg-accent" aria-hidden />
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-softgray sm:text-base">
              SATURDAY MORNINGS · 7 AM · CONWAY, SC
            </p>
            <h1 className="mt-4 font-display text-[2.85rem] leading-[0.92] tracking-wide text-offwhite sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              SHOW UP.
              <br />
              GET STRONGER.
              <br />
              BUILD BROTHERHOOD.
            </h1>
          </div>
        </div>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-offwhite/95 sm:ml-5 sm:text-xl md:ml-6">
          One hour. All fitness levels. No gym required.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:ml-5 sm:flex-row sm:items-center md:ml-6">
          <LinkButton
            href="#interest"
            variant="accent"
            className="w-full shadow-lg sm:w-auto"
          >
            I&apos;M INTERESTED
          </LinkButton>
          <LinkButton
            href="#share"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            INVITE A FRIEND
          </LinkButton>
        </div>
        <p className="mt-10 font-display text-sm tracking-[0.18em] text-softgray sm:ml-5 md:ml-6">
          HERITAGE PRESERVE · YELLOW DOT LN · POOL LOT
        </p>
      </div>
    </section>
  );
}
