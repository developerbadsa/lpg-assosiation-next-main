'use client';

import {useMemo, useRef, useState} from 'react';
import Modal from '../modal/Modal';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

export type CreateAlbumPayload = {
  title: string;
  description: string;
  publishDate: string; // yyyy-mm-dd
  coverPhoto: File | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate?: (payload: CreateAlbumPayload) => void | Promise<void>;
  defaultValues?: Partial<CreateAlbumPayload>;
};

export default function CreateAlbumModal({
  open,
  onClose,
  onCreate,
  defaultValues,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');
  const [publishDate, setPublishDate] = useState(defaultValues?.publishDate ?? '');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(
    defaultValues?.coverPhoto ?? null
  );
  const [submitting, setSubmitting] = useState(false);

  const coverName = useMemo(() => coverPhoto?.name ?? '', [coverPhoto]);

  const reset = () => {
    setTitle(defaultValues?.title ?? '');
    setDescription(defaultValues?.description ?? '');
    setPublishDate(defaultValues?.publishDate ?? '');
    setCoverPhoto(defaultValues?.coverPhoto ?? null);
  };

  const close = () => {
    onClose();
    reset();
  };

  const inputBase =
    'h-8 w-full rounded-[3px] border border-black/15 bg-white px-3 text-[12px] text-slate-700 outline-none focus:border-[#009970]';

  const labelClass = 'text-[11px] text-slate-600';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const payload: CreateAlbumPayload = {
      title: title.trim(),
      description: description.trim(),
      publishDate,
      coverPhoto,
    };

    setSubmitting(true);
    try {
      await onCreate?.(payload);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} title='Create a new album' maxWidthClassName='max-w-[520px]'>
      <form onSubmit={submit} className='p-4'>
        <div className='space-y-3'>
          <div>
            <div className={labelClass}>Album Title</div>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputBase}
              placeholder=''
            />
          </div>

          <div>
            <div className={labelClass}>Album Description</div>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={inputBase}
              placeholder=''
            />
          </div>

          <div>
            <div className={labelClass}>Publish date</div>
            <input
              type='date'
              value={publishDate}
              onChange={e => setPublishDate(e.target.value)}
              className={inputBase}
            />
          </div>

          <div>
            <div className={labelClass}>Cover Photo</div>

            <div className='flex items-center'>
              <input
                value={coverName}
                readOnly
                className={cx(inputBase, 'rounded-r-none')}
                placeholder='No file chosen'
              />

              <button
                type='button'
                onClick={() => fileRef.current?.click()}
                className={cx(
                  'h-8 rounded-[3px] rounded-l-none border border-l-0 border-black/15 bg-[#E9EDF2]',
                  'px-4 text-[12px] text-slate-700 hover:brightness-105 active:brightness-95'
                )}>
                Browse
              </button>

              <input
                ref={fileRef}
                type='file'
                className='hidden'
                accept='image/*'
                onChange={e => {
                  const f = e.currentTarget.files?.[0] ?? null;
                  setCoverPhoto(f);
                }}
              />
            </div>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-end gap-2'>
          <button
            type='button'
            onClick={close}
            className='h-8 rounded-[3px] bg-[#133374] px-4 text-[12px] font-semibold text-white hover:brightness-110 active:brightness-95'>
            Close
          </button>

          <button
            type='submit'
            disabled={submitting}
            className='h-8 rounded-[3px] bg-[#009970] px-4 text-[12px] font-semibold text-white hover:brightness-110 active:brightness-95 disabled:opacity-60'>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
