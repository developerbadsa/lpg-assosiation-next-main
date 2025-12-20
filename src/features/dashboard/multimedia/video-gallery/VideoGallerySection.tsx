'use client';

import {CloudUpload} from 'lucide-react';
import {useMemo} from 'react';

import MediaCard from '@/components/ui/media/MediaCard';
import UploadTile from '@/components/ui/media/UploadTile';

import {MOCK_VIDEOS} from './mocks';

export default function VideoGallerySection() {
  const videos = useMemo(() => MOCK_VIDEOS, []);

  return (
    <section>
      {/* header row (title centered + button right) */}
      <div className='relative flex items-center justify-center'>
        <h2 className='text-[14px] font-medium text-[#173A7A]'>Video Gallery</h2>

        <button
          type='button'
          className='absolute right-0 inline-flex h-8 items-center gap-2 rounded-[6px] bg-[#009970] px-4 text-[11px] font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95'
        >
          <CloudUpload size={14} />
          Ad Video
        </button>
      </div>

      {/* grid */}
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {videos.map((v) => (
          <MediaCard
            key={v.id}
            variant='video'
            title={v.title}
            dateText={v.dateText}
            thumbnail={v.thumbnail}
            onView={() => console.log('view', v.id)}
            onEdit={() => console.log('edit', v.id)}
            onDelete={() => console.log('delete', v.id)}
          />
        ))}

        {/* upload tile (reusable) */}
        <UploadTile
          label='Choose video or drag & drop it here.'
          hint='MP4, WEBM. Max 20 MB.'
          accept='video/*'
          onPick={(file) => console.log('picked video:', file.name)}
          icon='upload'
        />
      </div>
    </section>
  );
}
