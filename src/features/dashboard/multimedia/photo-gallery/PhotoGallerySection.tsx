'use client';

import {useMemo, useState} from 'react';
import {FolderPlus} from 'lucide-react';
import PhotoCard from './PhotoCard';
import UploadCard from './UploadCard';
import {MOCK_PHOTOS} from './mock';
import type {GalleryPhoto} from './types';
import CreateAlbumModal from '@components/ui/modal/CreateAlbumModal';



export default function PhotoGallerySection() {
  const [items, setItems] = useState<GalleryPhoto[]>(MOCK_PHOTOS);

  const gridItems = useMemo(() => items, [items]);
   const [openCreate, setOpenCreate] = useState(false);

  return (
    <section className='min-w-0'>
      {/* Title centered + button right (like screenshot) */}
      <div className='grid grid-cols-3 items-center'>
        <div />
        <h2 className='text-center text-[16px] font-medium text-[#133374]'>
          Photo Gallery
        </h2>

        <div className='flex justify-end'>
      <button
        type='button'
        onClick={() => setOpenCreate(true)}
        className='inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#009970] px-4 text-[12px] font-semibold text-white'>
        Create New Album
      </button>
        </div>
      </div>

      <div className='mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        {gridItems.map(item => (
          <PhotoCard
            key={item.id}
            item={item}
            onView={(id) => console.log('view', id)}
            onEdit={(id) => console.log('edit', id)}
            onDelete={(id) => console.log('delete', id)}
          />
        ))}

        <UploadCard
          onSelect={(files) => {
            console.log('selected files:', files);
          }}
        />
      </div>

       <CreateAlbumModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={async (payload) => {
          // call API later
          console.log(payload);
        }}
      />
    </section>
  );
}
