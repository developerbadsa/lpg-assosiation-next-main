import Image from 'next/image';
import associationLogo from '@assets/logo/logo-association.png';

const AboutIntroSection = () => {
   return (
      <section className='relative py-12 md:py-32'>
         {/* side glows */}
         <div className='pointer-events-none absolute left-[-160px] top-1/2 hidden h-[460px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_#75B5534F,_transparent_70%)] lg:block' />
         <div className='pointer-events-none absolute right-[-160px] top-1/2 hidden h-[460px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_#75B5534F,_transparent_70%)] lg:block' />
         <div className='lpg-container relative flex flex-col items-center gap-10 lg:flex-row'>
            {/* LEFT: circular logo */}
            <div className='flex w-full justify-center md:justify-start lg:w-[540px]'>
               <Image
                  src={associationLogo}
                  alt='Association logo'
                  className='h-[240px] w-[240px] object-contain sm:h-[320px] sm:w-[320px] lg:h-[520px] lg:w-[520px]'
               />
            </div>

            {/* RIGHT: heading + text */}
            <div className='w-full space-y-3 md:space-y-4 lg:w-[60%]'>
               <h2 className='text-[22px] font-semibold uppercase md:text-[16px]'>
                  BANGLADESH PETROLEUM DEALERS, DISTRIBUTORS, AGENTS AND PETROL
                  <br className='hidden md:block' />
                  PUMP OWNERS ASSOCIATION
               </h2>

               <p className='text-[15px] leading-relaxed '>
                  The energy sector plays a vital and strategic role in
                  sustaining Bangladesh’s economic growth and overall
                  development. The uninterrupted supply of petroleum fuels is
                  essential for industry, agriculture, transportation, and daily
                  life, making fuel distribution a cornerstone of national
                  progress.
               </p>

               <p className='text-[15px] leading-relaxed '>
                  Bangladesh Petroleum Dealer&apos;s, Distributor&apos;s,
                  Agent&apos;s &amp; Petrol Pump Owner&apos;s Association is a
                  nationally representative organization that serves as a
                  unified platform for entrepreneurs and stakeholders engaged in
                  the petroleum fuel distribution system of Bangladesh. The
                  Association is committed to safeguarding the legitimate rights
                  of its members, ensuring safe and consumer-friendly fuel
                  services, and supporting the implementation of government
                  energy policies.
               </p>

               <h3 className='pt-2 text-[16px] font-semibold uppercase'>
                  Convener&apos;s Message
               </h3>
               <p className='text-[15px] leading-relaxed '>
                  Petroleum dealers, distributors, agents and petrol pumps are a
                  traditional and ancient business industry sector in
                  Bangladesh. In the current global context, ensuring energy
                  security along with protecting the environment has become the
                  most important challenge for all nations. Due to limited
                  domestic natural gas reserves and the ever-increasing demand
                  for energy, the country is facing a permanent energy crisis.
                  In this reality, the use of alternative and environmentally
                  friendly fuels has emerged as a strategic necessity rather
                  than an option.
               </p>

               <p className='text-[15px] leading-relaxed '>
                  Liquefied Petroleum Gas (LPG) Autogas has already proven
                  itself as a clean, efficient and affordable alternative to
                  conventional fuels like petrol, octane, diesel and CNG in
                  Bangladesh and around the world. Our association members have
                  played a key role in this transformation by investing
                  significant resources, ensuring fuel supply and maintaining
                  quality of service for consumers.
               </p>

               <p className='text-[15px] leading-relaxed '>
                  Some provisions of the existing policy and the complex,
                  multi-tiered licensing and approval process have created
                  serious operational difficulties. Entrepreneurs often have to
                  seek permission from numerous authorities, resulting in
                  delays, increased costs and uncertainty. We respectfully
                  request the concerned authorities to introduce a one-stop
                  service system for licensing so traders can conduct business
                  without harassment and with greater confidence in the sector.
               </p>

               <p className='text-[15px] leading-relaxed '>
                  Our association is fully committed to working hand in hand
                  with the government, regulatory agencies and all stakeholders
                  to build a safe, efficient and sustainable petroleum
                  distribution system. Together, let us move forward for a
                  cleaner, safer and more sustainable energy future.
               </p>

               <h3 className='pt-2 text-[16px] font-semibold uppercase'>
                  Secretary General&apos;s Message
               </h3>
               <p className='text-[15px] leading-relaxed '>
                  The role of the energy sector in keeping Bangladesh&apos;s
                  economic progress and development momentum going is immense.
                  Our members are working tirelessly to ensure the country&apos;s
                  energy security, provide consumer-friendly services and
                  promote the use of environmentally friendly energy.
               </p>

               <p className='text-[15px] leading-relaxed '>
                  In the current energy crisis and global reality, the
                  importance of using alternative energy has increased. We
                  believe that it is possible to build a safe, modern and strong
                  energy sector through mutual cooperation and realistic
                  policy-making between the government, regulatory agencies and
                  businessmen. Our association will always play a responsible
                  role towards this goal.
               </p>
            </div>
         </div>
      </section>
   );
};

export default AboutIntroSection;
