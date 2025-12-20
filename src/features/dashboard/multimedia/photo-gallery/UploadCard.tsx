'use client';

import {useId, useMemo, useState} from 'react';
import {Image as ImageIcon} from 'lucide-react';

type Props = {
  onSelect?: (files: File[]) => void;
};

export default function UploadCard({onSelect}: Props) {
  const inputId = useId();
  const [dragOver, setDragOver] = useState(false);

  const accept = useMemo(() => ['image/jpeg', 'image/png', 'image/webp'], []);

  const pickFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const arr = Array.from(files).filter(f => accept.includes(f.type));
    if (!arr.length) return;
    onSelect?.(arr);
  };

  return (
    <div className='rounded-[14px] bg-[#F4F6FF] shadow-[0_18px_45px_rgba(0,0,0,0.18)]'>
      <div className='p-3'>
        <div
          className={[
            'grid h-[244px] place-items-center rounded-[14px] bg-white',
            'transition',
            dragOver ? 'ring-2 ring-emerald-400' : '',
          ].join(' ')}
          onDragEnter={e => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragOver={e => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
          }}
          onDrop={e => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
            pickFiles(e.dataTransfer.files);
          }}>
          <label
            htmlFor={inputId}
            className='cursor-pointer rounded-[14px] px-6 py-8 text-center'>
            <div className='mx-auto grid  max-w-full place-items-center rounded-[14px] border-2 border-dashed border-emerald-400/80 px-6 py-10 h-[80%]'>
              <div className='grid h-10 w-10 place-items-center rounded-[10px] bg-emerald-50 text-emerald-800'>
                <ImageIcon size={22} />
              </div>

              <div className='mt-4 text-[12px] font-medium text-emerald-800'>
                Choose images or drag &amp; drop it here.
              </div>
              <div className='mt-1 text-[10px] text-emerald-900/60'>
                JPG, JPEG PNG and WEBP, Max 20 MB.
              </div>
            </div>

            <input
              id={inputId}
              type='file'
              className='hidden'
              accept='.jpg,.jpeg,.png,.webp'
              multiple
              onChange={e => pickFiles(e.currentTarget.files)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
