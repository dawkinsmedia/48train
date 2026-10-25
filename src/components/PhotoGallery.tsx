import Image from "next/image";

const feature = {
  src: "/images/workout-lunges.jpg",
  alt: "Men of different ages in a kneeling lunge line on the asphalt, focused and working together",
  label: "HERITAGE PRESERVE · 7 AM",
} as const;

const moments = [
  {
    src: "/images/workout-ethan-leading.jpg",
    alt: "Men gathered in a circle listening before the workout begins",
    title: "THE HUDDLE",
    caption: "Quick brief, then we move.",
  },
  {
    src: "/images/workout-plank-encouragement.jpg",
    alt: "A man steadies another during a forearm plank while others cheer him on",
    title: "THE WORK",
    caption: "Hard enough to grow. Safe enough to stay.",
  },
  {
    src: "/images/workout-group-selfie.jpg",
    alt: "Five men smiling arm-in-arm after a Saturday workout",
    title: "THE FINISH",
    caption: "Sweat, laughs, and a photo before 8 AM.",
  },
] as const;

export function PhotoGallery() {
  return (
    <div className="space-y-3 md:space-y-4">
      <figure className="group relative aspect-[4/3] overflow-hidden border border-charcoal/10 bg-charcoal md:aspect-[21/9]">
        <Image
          src={feature.src}
          alt={feature.alt}
          fill
          className="object-cover object-[center_40%] transition duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 72rem"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent"
          aria-hidden
        />
        <figcaption className="absolute bottom-0 left-0 right-0 px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-display text-sm tracking-[0.3em] text-offwhite/90 sm:text-base">
            {feature.label}
          </p>
        </figcaption>
      </figure>

      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {moments.map((moment) => (
          <figure
            key={moment.src}
            className="flex w-[min(88vw,20rem)] shrink-0 snap-center flex-col border border-charcoal/10 bg-white md:w-auto"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5 sm:aspect-[5/6]">
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 88vw, 24rem"
              />
            </div>
            <figcaption className="border-t border-charcoal/10 px-4 py-4 sm:px-5 sm:py-5">
              <p className="font-display text-lg tracking-widest text-charcoal">
                {moment.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                {moment.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
