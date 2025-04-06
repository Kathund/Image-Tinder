'use client';

import Card from '../Components/Card/Card';
import type { FileInfo } from '../page';

export default function Cards({ images }: { images: FileInfo[] }) {
  return (
    <>
      <p>You finished the images! Now what?</p>
      {images.map((image: FileInfo, index: number) => {
        return (
          <div key={index} className="absolute" style={{ zIndex: index }}>
            <Card fileName={image.name} src={image.path} alt={image.name} height={600} width={600} rawFile={image} />
          </div>
        );
      })}
    </>
  );
}
