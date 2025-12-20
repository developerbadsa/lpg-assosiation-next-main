'use client';

import Image from 'next/image';
import {Eye, Pencil, Trash2} from 'lucide-react';
import type {GalleryPhoto} from './types';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

type Props = {
  item: GalleryPhoto;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function PhotoCard({item, onView, onEdit, onDelete}: Props) {
  return (
    <div className='rounded-[14px] bg-[#F4F6FF] shadow-[0_18px_45px_rgba(0,0,0,0.18)]'>
      <div className='p-4'>
        <div className='overflow-hidden rounded-[14px] bg-white'>
          <Image
            src={item.image}
            alt={item.alt ?? 'Gallery photo'}
            className='h-[170px] w-full object-cover'
            priority={false}
          />
        </div>

        <div className='mt-4 flex items-center justify-center gap-3 pb-1'>
          <button
            type='button'
            onClick={() => onView?.(item.id)}
            aria-label='View'
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition active:scale-[0.98]',
              'bg-[#2F6DF6] hover:brightness-110'
            )}>
            <Eye size={18} />
          </button>

          <button
            type='button'
            onClick={() => onEdit?.(item.id)}
            aria-label='Edit'
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition active:scale-[0.98]',
              'bg-[#21B35B] hover:brightness-110'
            )}>
            <Pencil size={18} />
          </button>

          <button
            type='button'
            onClick={() => onDelete?.(item.id)}
            aria-label='Delete'
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition active:scale-[0.98]',
              'bg-[#E64545] hover:brightness-110'
            )}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
