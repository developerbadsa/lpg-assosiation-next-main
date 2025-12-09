'use client';

import Image, { type StaticImageData } from 'next/image';

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData | string; 
};

export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article
      className="
        relative flex h-full flex-col items-center
        rounded-[24px] border border-[#E5F0FF]
        bg-white
        px-8 pb-8 pt-9
        shadow-[0_22px_40px_rgba(9,46,94,0.10)]
      "
    >
      {/* left green tab */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
          h-[72px] w-[16px]
          rounded-[999px]
          bg-[#16B55B]
          shadow-[0_12px_26px_rgba(6,142,76,0.55)]
        "
      />

      {/* icon */}
      <div className="relative h-[72px] w-[72px]">
        <Image
          src={item.icon}
          alt={item.title}
          fill
          sizes="72px"
          className="
            object-contain
            drop-shadow-[0_20px_32px_rgba(0,176,109,0.55)]
          "
        />
      </div>

      {/* title */}
      <h3
        className="
          mt-6 text-center
          text-[12px] font-semibold uppercase
          tracking-[0.18em] text-[#153976]
        "
      >
        {item.title}
      </h3>

      {/* description */}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-[#7A8799]">
        {item.description}
      </p>
    </article>
  );
}
