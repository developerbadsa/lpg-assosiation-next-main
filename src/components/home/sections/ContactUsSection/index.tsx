'use client';

import SectionHeading from '@/components/ui/SectionHeading';

type ContactItemType = 'person' | 'email' | 'phone' | 'location';

type ContactItem = {
  id: string;
  type: ContactItemType;
  label: string;
  value: string;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 'person',
    type: 'person',
    label: 'CONTACT PERSON:',
    value: 'Md. Mosharaf Hossain',
  },
  {
    id: 'email',
    type: 'email',
    label: 'EMAIL:',
    value: 'bdlpqautogas19@gmail.com',
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'CALL:',
    value: '01704179247',
  },
  {
    id: 'location',
    type: 'location',
    label: 'LOCATION:',
    value: 'House - 2, Road - 2, Pallabi, Mirpur, Dhaka-1216',
  },
];

// put your real Google Maps embed url here
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d90.366!3d23.815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd';

function ContactIcon({ type }: { type: ContactItemType }) {
  const common =
    'h-6 w-6 text-white stroke-[1.6]';

  if (type === 'person') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <circle cx="12" cy="9" r="3.2" stroke="currentColor" />
        <path
          d="M6.5 18.5C7.6 16.6 9.6 15.5 12 15.5C14.4 15.5 16.4 16.6 17.5 18.5"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" />
        <path d="M5 8.5L12 13L19 8.5" stroke="currentColor" />
      </svg>
    );
  }
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path
          d="M9.2 4.2L6.7 4C6 4 5.4 4.5 5.3 5.2C5 7.2 5.5 9.1 6.5 10.9C7.6 12.7 9 14.2 10.8 15.3C12.6 16.4 14.5 16.9 16.5 16.6C17.2 16.5 17.7 15.9 17.7 15.2L17.5 12.8C17.5 12.3 17 12 16.6 12.2L14.6 13.1C14.2 13.3 13.7 13.2 13.4 12.9L11.2 10.8C10.9 10.5 10.8 10 11 9.6L11.9 7.6C12.1 7.2 11.8 6.7 11.3 6.7L9.2 6.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // location
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none">
      <path
        d="M12 21C12 21 6.5 15.9 6.5 10.8C6.5 8.1 8.6 6 11.3 6C14 6 16.1 8.1 16.1 10.8C16.1 15.9 12 21 12 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.1" stroke="currentColor" />
    </svg>
  );
}

function ContactInfoCard({ item }: { item: ContactItem }) {
  return (
    <article
      className="
        relative flex h-[86px] items-center
        rounded-[18px]
        bg-[radial-gradient(circle_at_top_left,#16B55B33,#00894E)]
        px-6
        shadow-[0_18px_36px_rgba(0,0,0,0.25)]
        text-white
        overflow-hidden
      "
    >
      {/* subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.17] bg-[radial-gradient(circle,#0AF3FF_1px,transparent_1px)] bg-[length:14px_14px]" />
      {/* blur highlight */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,#27F58E66,transparent_70%)]" />

      <div className="relative mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
        <ContactIcon type={item.type} />
      </div>

      <div className="relative flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
          {item.label}
        </span>
        <span className="mt-[3px] text-[12px] font-medium leading-snug">
          {item.value}
        </span>
      </div>
    </article>
  );
}

export default function ContactUsSection() {
  return (
    <section className="relative w-full py-16">
      {/* soft background + dots */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#E4F5FF80,_transparent_65%)]" />
      <div className="pointer-events-none absolute right-6 top-40 h-40 w-6 bg-[radial-gradient(circle,#D4E2F4_2px,transparent_2px)] bg-[length:8px_8px] opacity-70" />

      <div className="lpg-container relative">
        <SectionHeading
          title="CONTACT US"
          subtitle="Have questions or need assistance? Our team is here to help. Reach out to us anytime for quick, friendly, and reliable support."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* LEFT: info cards */}
          <div className="flex flex-col gap-4">
            {CONTACT_ITEMS.map(item => (
              <ContactInfoCard key={item.id} item={item} />
            ))}
          </div>

          {/* RIGHT: map + form */}
          <div className="flex flex-col gap-4">
            {/* Map */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-[18px] border border-[#CDE4FF] shadow-[0_18px_32px_rgba(9,46,94,0.18)]">
              <iframe
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Form */}
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name*"
                className="h-[66px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
                required
              />
              <input
                type="email"
                placeholder="Your Email*"
                className="h-[66px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="h-[66px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
              />
              <input
                type="tel"
                placeholder="Your Phone*"
                className="h-[66px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
                required
              />

              <textarea
                placeholder="Message"
                className="md:col-span-2 h-[120px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 py-3 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] resize-none focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
              />

              {/* Captcha row */}
              <div className="flex h-[54px] items-center rounded-[14px] border border-[#E5F0FF] bg-[#F7FAFF] px-4 text-[12px] text-[#4B5C76]">
                {/* fake captcha toolbar icons */}
                <div className="flex items-center gap-2">
                  <span className="h-[18px] w-[18px] rounded-[6px] bg-[#24C77C]" />
                  <span className="h-[18px] w-[18px] rounded-[6px] bg-[#FFB026]" />
                  <span className="h-[18px] w-[18px] rounded-[6px] bg-[#5C7CFF]" />
                  <span className="h-[18px] w-[18px] rounded-[6px] bg-[#FF5A5F]" />
                </div>
                <button
                  type="button"
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#DBE7FF] bg-white text-[#7A8799]"
                >
                  ⟳
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter Captcha*"
                className="h-[54px] rounded-[14px] border border-[#E5F0FF] bg-white px-4 text-[13px] text-[#1E2F4D] placeholder:text-[#9AA6BD] focus:outline-none focus:ring-2 focus:ring-[#16B55B33]"
                required
              />
            </form>

            {/* Button */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="
                  inline-flex h-10 items-center justify-center
                  rounded-full bg-[#16B55B]
                  px-8 text-[12px] font-semibold uppercase tracking-[0.18em]
                  text-white shadow-[0_12px_26px_rgba(6,142,76,0.55)]
                  hover:bg-[#14a153] transition-colors
                "
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
