'use client';

import {useId, useMemo, useState} from 'react';
import {Image as ImageIcon, Upload} from 'lucide-react';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

type Props = {
  label: string; // e.g. "Choose video or drag & drop it here."
  hint?: string; // e.g. "MP4, WEBM. Max 20 MB."
  accept?: string; // e.g. "video/*"
  onPick: (file: File) => void;
  className?: string;
  icon?: 'upload' | 'image';
};

export default function UploadTile({
  label,
  hint,
  accept,
  onPick,
  className,
  icon = 'upload',
}: Props) {
  const inputId = useId();
  const [drag, setDrag] = useState(false);

  const Icon = useMemo(() => (icon === 'image' ? ImageIcon : Upload), [icon]);

  return (
    <div
      className={cx(
        'rounded-[10px] bg-white',
        'shadow-[0_18px_45px_rgba(0,0,0,0.14)]',
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onPick(f);
      }}
    >
      <div className='p-4'>
        <label
          htmlFor={inputId}
          className={cx(
            'flex min-h-[210px] cursor-pointer items-center justify-center rounded-[8px]',
            'border border-dashed',
            drag ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-400/70 bg-[#F4F7FB]'
          )}
        >
          <div className='text-center'>
            <div className='mx-auto mb-2 grid h-10 w-10 place-items-center rounded-[8px] border border-emerald-400/40 bg-white'>
              <Icon size={18} className='text-emerald-700' />
            </div>

            <div className='text-[11px] font-medium text-emerald-800'>{label}</div>
            {hint ? (
              <div className='mt-1 text-[9px] text-slate-500'>{hint}</div>
            ) : null}
          </div>
        </label>

        <input
          id={inputId}
          type='file'
          className='hidden'
          accept={accept}
          onChange={(e) => {
            const f = e.currentTarget.files?.[0];
            if (f) onPick(f);
          }}
        />
      </div>
    </div>
  );
}
