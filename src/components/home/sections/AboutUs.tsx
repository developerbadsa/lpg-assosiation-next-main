'use client';

import Image, {StaticImageData} from 'next/image';
import aboutImg from './../img/Group 46.png';
import SectionHeading from '@components/ui/SectionHeading';
import iconImg1 from './../img/Group 360.png';
import iconImg2 from './../img/Group 51.png';
import subtrackImg from '@assets/wrappers/Subtract.png';
import objectanimation from './../../../assets/ui-icons/OBJECTS.png';

type VisionStat = {
   icon: StaticImageData;
   label: string;
   value: string;
};

const visionStats: VisionStat[] = [
   {
      icon: iconImg1,
      label: 'TOTAL MEMBERS',
      value: '483',
   },
   {
      icon: iconImg2,
      label: 'PETROL PUMPS',
      value: '928',
   },
];

export default function AboutUsSection() {
   return (
      <section className='relative  md:py-16'>
         {/* subtle background geometry */}

         <div className='lpg-container relative'>
            {/* main heading */}
            <div className='mb-10 text-center'>
               <SectionHeading
                  title=' ABOUT US'
                  subtitle='A nationally representative association for petroleum dealers,
                  distributors, agents and petrol pump owners.'
               />
               <h2 className='text-[22px] font-semibold tracking-[0.22em] text-[#203566]'></h2>
               <p className='mt-2 text-[12px] leading-relaxed text-[#7B8EA5]'>
                  The uninterrupted supply of petroleum fuels is essential for industry,
                  agriculture, transportation and daily life. Our association provides a
                  unified platform to safeguard members&apos; rights, ensure safe and
                  consumer-friendly fuel services and support the nation&apos;s energy policies.
               </p>
            </div>

            {/* content grid */}
            <div className='grid gap-10 items-start lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]'>
               {/* left: vision + stats */}
               <div className='max-w-xl'>
                  <h3 className='text-[14px] font-semibold '>
                     OUR VISION
                  </h3>

                  <p className='mt-3 text-[12px] leading-relaxed text-[#5F6F85]'>
                     To develop a safe, sustainable and modern fuel supply system in
                     Bangladesh—where the collective participation of petrol pump owners,
                     dealers, distributors and agents ensures a balanced combination of
                     consumer-friendly services, energy security and environmental protection.
                  </p>
                  <p className='mt-3 text-[12px] leading-relaxed text-[#5F6F85]'>
                     We are committed to coordinated action with the government and relevant
                     stakeholders to promote responsible, transparent and investment-friendly
                     growth across the petroleum distribution sector.
                  </p>

                  {/* stats cards */}
                  <div className='mt-7 grid gap-4 place-items-center sm:grid-cols-2 sm:place-items-start'>
                     {visionStats.map((stat, idx) => (
                        <VisionStatCard key={idx} {...stat} />
                     ))}
                  </div>
               </div>

               {/* right: station illustration */}
               <div className='relative mx-auto mt-6  w-full max-w-[580px] items-center justify-center lg:mt-0 hidden lg:flex'>
                  {/* soft glow behind image */}
                  {/* <div className='pointer-events-none absolute inset-x-6 bottom-0 top-6 rounded-[32px] bg-[radial-gradient(circle_at_center,_#7CDF6A55,_transparent_70%)]' /> */}
                  <div className='relative w-full overflow-hidden rounded-[26px] '>
                     <Image
                        src={aboutImg} 
                        alt='Petrol pump illustration'
                        width={720}
                        height={480}
                        className='h-auto w-full object-cover'
                        priority
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className='absolute -left-[0.1%] -bottom-[120px] z-0 h-[320px] md:-bottom-[160px] md:h-[420px] lg:h-[550px]'>
            <Image
               src={objectanimation}
               alt=''
               className='object-contain h-full w-[100%] opacity-35 rotate-180 scale-[1.2]'
            />
         </div>
      </section>
   );
}

function VisionStatCard({icon, label, value}: VisionStat) {
   return (
      <article
         className='
        relative flex min-h-[220px] w-full max-w-[220px] flex-col
        overflow-hidden
        rounded-[22px] sm:min-h-[250px] '>
         <div className='absolute -top-6 -right-6 inset-1 z-1'>
            <Image src={subtrackImg} fill alt='' />
         </div>

         {/* top-right green corner tab */}
         <div
            className='
          pointer-events-none
          absolute right-1 top-0
          h-[64px] w-[150px] rounded-[40px]
          bg-[#75B551] z-0'
         />

         {/* content */}
         <div className='relative flex flex-1 flex-col px-7 pt-7 pb-6 z-2'>
            {/* icon */}
            <div className='h-[76px] w-[76px]'>
               <Image
                  src={icon}
                  alt={label}
                  className='h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(0,176,109,0.55)]'
               />
            </div>

            {/* label + value pinned toward bottom like design */}
            <div className='mt-auto'>
               <p className='text-[18px] font-semibold uppercase tracking-[0.0em] '>
                  {label}
               </p>
               <p className='mt-2 text-[50px] font-semibold leading-none '>
                  {value}
               </p>
            </div>
         </div>
      </article>
   );
}
