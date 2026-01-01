import React from 'react';

type LoaderSize = 'sm' | 'md' | 'lg';

type LoaderProps = {
   label?: string;
   size?: LoaderSize;
   className?: string;
};

const sizeStyles: Record<LoaderSize, string> = {
   sm: 'h-4 w-4 border-2',
   md: 'h-6 w-6 border-2',
   lg: 'h-10 w-10 border-[3px]',
};

export default function Loader({
   label = 'Loading...',
   size = 'md',
   className = '',
}: LoaderProps) {
   return (
      <div
         className={`flex items-center justify-center gap-2 text-sm text-slate-600 ${className}`}
         role='status'
         aria-live='polite'>
         <span
            className={`inline-block animate-spin rounded-full border border-slate-200 border-t-[#009970] ${sizeStyles[size]}`}
            aria-hidden='true'
         />
         {label ? <span>{label}</span> : null}
      </div>
   );
}
