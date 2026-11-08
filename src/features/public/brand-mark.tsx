import { Bot } from "lucide-react";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 place-items-center border border-[#17161d] bg-[#fffcfb] text-[#17161d] ${className}`}
    >
      <Bot className="size-[18px]" strokeWidth={2} />
    </span>
  );
}
