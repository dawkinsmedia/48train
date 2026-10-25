const facts = [
  { label: "WHEN", value: "SATURDAYS · 7 AM" },
  { label: "LENGTH", value: "ONE HOUR" },
  { label: "LEVEL", value: "ALL ABILITIES" },
  { label: "COST", value: "FREE" },
] as const;

export function EventFactsBar() {
  return (
    <div className="relative z-10 bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-content grid-cols-2 divide-x divide-y divide-offwhite/10 sm:grid-cols-4 sm:divide-y-0">
        {facts.map((fact) => (
          <div key={fact.label} className="px-5 py-6 text-center sm:py-8">
            <p className="font-display text-xs tracking-[0.25em] text-softgray">
              {fact.label}
            </p>
            <p className="mt-2 font-display text-xl tracking-wide sm:text-2xl">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
