
'use client';

import type {ButtonHTMLAttributes} from 'react';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md';
};

export default function PrimaryButton({size = 'md', className, ...props}: Props) {
  const h = size === 'sm' ? 'h-8' : 'h-9';
  const px = size === 'sm' ? 'px-4' : 'px-5';

  return (
    <button
      {...props}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#009970] text-[12px] font-medium text-white shadow-sm transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60',
        h,
        px,
        className
      )}
    />
  );
}
