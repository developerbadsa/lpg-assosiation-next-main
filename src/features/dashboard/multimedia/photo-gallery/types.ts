import type {StaticImageData} from 'next/image';

export type GalleryPhoto = {
  id: string;
  image: StaticImageData;
  alt?: string;
};
