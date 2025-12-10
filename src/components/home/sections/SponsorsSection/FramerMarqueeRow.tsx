import {motion} from 'framer-motion';
import Image from 'next/image';
import {Sponsor} from './';

export type Direction = 'left' | 'right';

type FramerMarqueeRowProps = {
   items: Sponsor[];
   direction: Direction;
   durationSec?: number;
   className?: string;
};

export default function FramerMarqueeRow({
   items,
   direction,
   durationSec = 10, // smaller = faster, bigger = slower
   className,
}: FramerMarqueeRowProps) {
   // duplicate for seamless infinite loop
   const duplicated = [...items, ...items];

   const xKeyframes = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

   return (
      <div
         className={['relative pt-2 h-[65px] flex justify-center items-center mx-auto overflow-hidden', className ?? '']
            .filter(Boolean)
            .join(' ')}>
         {/* sizing row: sets width = 2 / 4 / 5 cards EXACTLY */}
         <div className='flex justify-center gap-4  opacity-0 pointer-events-none select-none'>
            {items.map((sponsor, index) => {
               return (
                  <div
                     key={`sizer-${sponsor.name}-${index}`}
                     className='flex h-[50px] min-w-[130px] items-center justify-center rounded-[12px] bg-white px-6 shadow-[0_1px_4px_rgba(0,0,0,0.0)] '>
                     <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={100}
                        height={32}
                        className='object-contain'
                     />
                  </div>
               );
            })}
         </div>

         {/* marquee track: absolutely positioned, slides left/right */}
         <motion.div
            className='absolute inset-0 flex justify-center gap-4 flex items-center '
            style={{willChange: 'transform'}}
            animate={{x: xKeyframes}}
            transition={{
               duration: durationSec,
               ease: 'linear',
               repeat: Infinity,
               repeatType: 'loop',
            }}>
            {duplicated.map((sponsor, index) => (
               <div
                  key={`${sponsor.name}-${index}`}
                  className='flex h-[50px] min-w-[130px] items-center justify-center rounded-[12px] bg-white px-6 shadow-[0_0px_12px_rgba(0,0,0,0.0.2)] '>
                  <Image
                     src={sponsor.logo}
                     alt={sponsor.name}
                     width={100}
                     height={32}
                     className='object-contain'
                  />
               </div>
            ))}
         </motion.div>
      </div>
   );
}
