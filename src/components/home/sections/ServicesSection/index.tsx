'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import { ServiceCard, type ServiceItem } from './ServiceCard';

// Put 4 icons in /public/service-icons and update file names if needed
const SERVICES: ServiceItem[] = [
  {
    id: 'vision',
    title: 'OUR VISION',
    icon: '/service-icons/vision.png',
    description:
      'Online Energy Operational Development, Productivity & Business Scenario – From LPG cylinder to station and autogas conversion. We ensure safe and efficient operations with modern technology and expert guidance.',
  },
  {
    id: 'chain',
    title: 'LARGEST LPG OWNERS CHAIN MANAGEMENT',
    icon: '/service-icons/chain.png',
    description:
      'The largest LPG owners’ chain across Bangladesh, supporting dealers and partners with centralized logistics, training and performance monitoring to maintain consistent service quality.',
  },
  {
    id: 'autogas',
    title: 'AUTOGAS BUSINESS',
    icon: '/service-icons/autogas.png',
    description:
      'We bring innovation into the autogas business with a strong supply chain, safe conversion services and continuous monitoring of market demands and regulations.',
  },
  {
    id: 'station',
    title: 'LPG STATION MANAGEMENT',
    icon: '/service-icons/station.png',
    description:
      'LPG stations are audited and managed under strict guidelines to ensure 24/7 service, safety compliance and customer satisfaction across the entire network.',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full py-16">
      {/* soft background glow & dots */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#E4F5FF80,_transparent_65%)]" />
      <div className="pointer-events-none absolute -right-10 top-24 h-32 w-32 rounded-full border border-[#16B55B1A] bg-[radial-gradient(circle,_#16B55B26,_transparent_70%)]" />
      <div className="pointer-events-none absolute left-6 bottom-10 h-24 w-24 rounded-full border border-[#16B55B0F]" />

      <div className="lpg-container relative">
        <SectionHeading
          title="SERVICES"
          subtitle="Our main focus is to build Members’ Chain and Channel Support that together ensure safe and efficient nationwide activities in LPG, Autogas and Pipelines with quality 24/7 service."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SERVICES.map(item => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
