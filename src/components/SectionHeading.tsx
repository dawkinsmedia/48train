type Props = {
  eyebrow?: string;
  title: string;
  className?: string;
  invert?: boolean;
  accentBar?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  invert = false,
  accentBar = true,
}: Props) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 font-display text-sm tracking-[0.25em] ${invert ? "text-softgray" : "text-olive"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="flex gap-4 sm:gap-5">
        {accentBar ? (
          <div
            className={`mt-1 w-1 shrink-0 self-stretch ${invert ? "bg-accent" : "bg-olive"}`}
            aria-hidden
          />
        ) : null}
        <h2
          className={`font-display text-4xl leading-[0.95] tracking-wide sm:text-5xl md:text-6xl ${invert ? "text-offwhite" : "text-charcoal"}`}
        >
          {title}
        </h2>
      </div>
    </header>
  );
}
