"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface AccordionItemData {
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-wide"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.title}
              <span className="text-lg font-light">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="pb-4 text-sm leading-relaxed text-muted">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
