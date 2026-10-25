import Image from "next/image";
import { Hero } from "@/components/Hero";
import { EventFactsBar } from "@/components/EventFactsBar";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InterestForm } from "@/components/InterestForm";
import { ShareSection } from "@/components/ShareSection";
import { StickyCta } from "@/components/StickyCta";
import { LinkButton } from "@/components/ui/Button";
import {
  getSiteUrl,
  MAPS_DIRECTIONS_URL,
  MAPS_SEARCH_URL,
  MEETING_SPOT,
} from "@/lib/site";

const steps = [
  {
    title: "SHOW UP",
    body: `7 AM in the pool parking lot on ${MEETING_SPOT.street} (Heritage Preserve). Outdoors. No membership. No gym.`,
  },
  {
    title: "PUT IN THE WORK",
    body: "One hour together—challenging, approachable, and honest about where you are today.",
  },
  {
    title: "LEAVE STRONGER",
    body: "Healthier for the weekend, connected to other men, and glad you came.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventFactsBar />

      <main>
        <section className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="FROM THE PARKING LOT"
            title="REAL MEN. REAL MORNINGS."
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/85">
            Unfiltered photos from the first Saturdays—not a shoot, just guys who
            showed up before most of Conway was awake.
          </p>
          <div className="mt-8 sm:mt-10">
            <PhotoGallery />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <LinkButton href="#share" variant="accent" className="w-full sm:w-auto">
              INVITE A FRIEND
            </LinkButton>
            <LinkButton
              href="#interest"
              variant="ghost"
              showChevron
              className="w-full sm:w-auto"
            >
              I&apos;M INTERESTED
            </LinkButton>
          </div>
        </section>

        {/* More than a workout */}
        <section className="border-y border-charcoal/10 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <figure className="relative order-2 aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5 shadow-lg sm:aspect-[5/4] lg:order-1 lg:aspect-[4/5]">
                <Image
                  src="/images/workout-warmup-circle.jpg"
                  alt="Men in a circle stretching and laughing before the workout in the parking lot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </figure>
              <div className="order-1 lg:order-2">
                <SectionHeading title="MORE THAN A SATURDAY MORNING." />
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/85">
                  <p>
                    The workout is the door, not the whole house. We&apos;re building
                    something bigger: discipline, consistency, encouragement, and
                    brotherhood that lasts past 8 AM.
                  </p>
                  <p>
                    This isn&apos;t a men&apos;s ministry program or a boot camp with a
                    logo. It&apos;s neighbors choosing to get up, get after it, and look
                    out for each other.
                  </p>
                  <p className="text-balance font-medium text-charcoal">
                    You don&apos;t have to be in shape to show up. You just have to be
                    willing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-offwhite py-16 sm:py-24">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <SectionHeading title="ONE HOUR. EVERY SATURDAY." className="mb-12" />
            <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="border-t-4 border-olive bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="font-display text-sm tracking-[0.2em] text-olive">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-3xl tracking-wide text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-charcoal/80">{step.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <LinkButton href="#interest" variant="accent" className="w-full sm:w-auto">
                I&apos;M INTERESTED
              </LinkButton>
            </div>
          </div>
        </section>

        {/* Foundation */}
        <section className="bg-charcoal py-16 text-offwhite sm:py-24">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <SectionHeading invert title="TRAIN FOR MORE." />
            <blockquote className="mt-10 max-w-3xl border-l-2 border-olive pl-6">
              <p className="font-display text-2xl leading-snug tracking-wide sm:text-3xl">
                &ldquo;For while bodily training is of some value, godliness is
                of value in every way, as it holds promise for the present life
                and also for the life to come.&rdquo;
              </p>
              <footer className="mt-4 text-sm tracking-widest text-softgray">
                — 1 TIMOTHY 4:8 (ESV)
              </footer>
            </blockquote>
            <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-offwhite/85">
              <p>
                Physical training is worth something. Scripture says godliness is
                worth more—and carries promise for this life and the next.
              </p>
              <p>
                That conviction shapes why we meet, but this isn&apos;t church dressed
                up as exercise. Come as you are, wherever you are in your fitness
                or your faith.
              </p>
            </div>
          </div>
        </section>

        {/* Interest */}
        <section
          id="interest"
          className="scroll-mt-8 border-t border-charcoal/10 bg-offwhite py-16 sm:py-24"
        >
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <div className="mx-auto max-w-xl">
              <SectionHeading title="THERE'S A PLACE FOR YOU." />
              <p className="mt-6 text-lg leading-relaxed text-charcoal/85">
                Thinking about joining us one Saturday? Share your contact info so
                Ethan can welcome you and keep you in the loop as the community
                grows.
              </p>
              <div className="relative mt-10">
                <InterestForm />
              </div>
            </div>
          </div>
        </section>

        {/* Location + sharing */}
        <section id="share" className="scroll-mt-8 border-t border-charcoal/10 py-16 sm:py-24">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <SectionHeading title="YOUR SATURDAY STARTS HERE." />
            <address className="mt-8 not-italic">
              <p className="font-display text-2xl tracking-wide text-charcoal">
                {MEETING_SPOT.neighborhood}
              </p>
              <p className="mt-1 text-lg text-charcoal/85">
                Pool parking lot · {MEETING_SPOT.street}
              </p>
              <p className="text-lg text-charcoal/85">{MEETING_SPOT.city}</p>
              <p className="mt-2 text-base text-charcoal/70">
                {MEETING_SPOT.landmark}
              </p>
              <p className="mt-4 font-display text-lg tracking-widest text-olive">
                SATURDAYS · 7:00–8:00 AM · FREE
              </p>
            </address>
            <figure className="mt-8 max-w-lg overflow-hidden border border-charcoal/10 bg-white">
              <Image
                src="/images/meeting-spot-map.png"
                alt="Map showing the workout meetup at the Heritage Preserve pool parking lot on Yellow Dot Lane, off US Highway 90"
                width={640}
                height={640}
                className="h-auto w-full"
              />
              <figcaption className="border-t border-charcoal/10 px-4 py-3 text-sm text-charcoal/75">
                We meet in the pool parking loop—same spot as the pin above.
              </figcaption>
            </figure>
            <p className="mt-6 max-w-xl text-charcoal/80">
              From US Hwy 90, take Long Leaf Pine Dr to Yellow Dot Ln and pull
              into the pool parking lot. Tap below for turn-by-turn directions
              to the exact pin.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center bg-charcoal px-6 font-display text-lg tracking-widest text-offwhite transition hover:bg-charcoal/90"
              >
                GET DIRECTIONS
              </a>
              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center font-display text-lg tracking-widest text-charcoal underline decoration-olive/50 underline-offset-4 hover:decoration-olive"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
            <div className="mt-12 border-l-4 border-accent bg-white p-6 shadow-sm sm:p-10">
              <p className="font-display text-2xl tracking-wide text-charcoal">
                KNOW A GUY WHO SHOULD BE HERE?
              </p>
              <p className="mt-3 max-w-xl text-charcoal/80">
                Most men come because someone they trust invited them. Send the
                link—it takes ten seconds.
              </p>
              <div className="mt-6">
                <ShareSection shareUrl={getSiteUrl()} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-charcoal/10 py-10 text-center">
        <p className="font-display text-sm tracking-[0.15em] text-charcoal">
          SATURDAY MORNINGS · CONWAY, SC
        </p>
        <p className="mt-2 text-sm text-softgray">1 Timothy 4:8</p>
      </footer>

      <StickyCta />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
