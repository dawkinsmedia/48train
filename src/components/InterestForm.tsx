"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const submittedRef = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittedRef.current || state === "submitting") return;

    setError(null);
    setState("submitting");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      smsConsent: fd.get("smsConsent") === "on",
      company: String(fd.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      submittedRef.current = true;
      setState("success");
      form.reset();
    } catch {
      setError("Network error. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-sm border border-olive/30 bg-olive/10 px-6 py-8 text-center"
        role="status"
      >
        <p className="font-display text-2xl tracking-wide text-charcoal">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-lg text-charcoal/80">
          We hope to see you Saturday at 7 AM!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-describedby={error ? "form-error" : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">
            First name <span className="text-olive">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base outline-none ring-olive transition focus:border-olive focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base outline-none ring-olive transition focus:border-olive focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email <span className="text-olive">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base outline-none ring-olive transition focus:border-olive focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Mobile phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base outline-none ring-olive transition focus:border-olive focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Anything you&apos;d like Ethan to know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full resize-y rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base outline-none ring-olive transition focus:border-olive focus:ring-2"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="smsConsent"
          name="smsConsent"
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 rounded border-charcoal/30 text-olive focus:ring-olive"
        />
        <label htmlFor="smsConsent" className="text-sm leading-relaxed text-charcoal/80">
          I agree to receive occasional workout updates by text message. Message
          and data rates may apply. Reply STOP to opt out. This is optional and
          not required to join us on Saturday.
        </label>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p id="form-error" className="text-sm font-medium text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="accent"
        showChevron
        disabled={state === "submitting"}
        className="w-full sm:w-auto"
      >
        {state === "submitting" ? "SUBMITTING…" : "COUNT ME IN"}
      </Button>
    </form>
  );
}
