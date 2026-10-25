import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ChevronRight } from "@/components/ui/Chevron";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "default" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-offwhite shadow-sm hover:bg-charcoal/90 focus-visible:ring-olive",
  accent:
    "bg-accent text-charcoal shadow-sm hover:bg-accent/90 focus-visible:ring-accent",
  secondary:
    "border-2 border-offwhite/90 bg-transparent text-offwhite hover:bg-offwhite/10 focus-visible:ring-offwhite",
  ghost:
    "border-2 border-charcoal/15 bg-white text-charcoal shadow-sm hover:border-charcoal/30 hover:shadow focus-visible:ring-olive",
};

const sizes: Record<Size, string> = {
  default: "min-h-14 px-8 py-3.5 text-lg",
  sm: "min-h-11 px-5 py-2.5 text-base",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  showChevron?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className = "",
    variant = "primary",
    size = "default",
    showChevron = false,
    type = "button",
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-display tracking-widest transition-[background-color,box-shadow,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-offwhite disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showChevron ? <ChevronRight /> : null}
    </button>
  );
});

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  showChevron?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "default",
  showChevron = true,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-display tracking-widest transition-[background-color,box-shadow,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-offwhite ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      {showChevron ? <ChevronRight /> : null}
    </a>
  );
}
