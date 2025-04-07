'use client';

import { useState } from 'react';
import Card from '../Components/Card/Card';
import type { FileInfo } from '../page';

export default function Cards({ images }: { images: FileInfo[] }) {
  const [hasSetIndex, setHasSetIndex] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(images.length - 1);
  const [finishedStack, setFinishedStack] = useState(false);

  if (images.length > 0 && hasSetIndex === false) {
    setCurrentIndex(images.length - 1);
    setHasSetIndex(true);
  }

  return (
    <>
      <div className={`${finishedStack ? 'block' : 'hidden'} text-center text-4xl`}>
        <p>You finished the image stack!</p>
        <p>Go back and check the original folder and delete the Trash folder</p>
      </div>
      {images.map((image: FileInfo, index: number) => {
        return (
          <Card
            fileName={image.name}
            src={image.path}
            alt={image.name}
            rawFile={image}
            index={index}
            displayFinishedMessage={() => setFinishedStack(true)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            key={index}
          />
        );
      })}
    </>
  );
}
