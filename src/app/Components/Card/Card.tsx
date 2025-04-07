'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CardButtons from './CardButtons';
import type { FileInfo } from '~/app/page';

type CardProps = {
  fileName: string;
  src: string;
  alt: string;
  rawFile: FileInfo;
  index: number;
  displayFinishedMessage: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

export default function Card({ fileName, src, alt, rawFile, index, displayFinishedMessage, currentIndex, setCurrentIndex }: CardProps) {
  const [rightMoved, setRightMoved] = useState(false);
  const [leftMoved, setLeftMoved] = useState(false);

  function formatDate(date: Date): string {
    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const ordinal = (n: number): string => {
      if (n >= 11 && n <= 13) return `${n}th`;
      switch (n % 10) {
        case 1:
          return `${n}st`;
        case 2:
          return `${n}nd`;
        case 3:
          return `${n}rd`;
        default:
          return `${n}th`;
      }
    };

    return `${ordinal(day)} of ${monthName} ${year} at ${hour}:${minute}`;
  }

  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
    };
  }, [src]);

  const isPortrait = imgSize ? imgSize.height > imgSize.width : false;
  const dynamicCardStyle = isPortrait ? 'min-w-64 min-h-96' : 'min-w-96 min-h-64';

  return (
    <>
      <div
        className={`flex ${dynamicCardStyle} scale-150 flex-col items-center justify-between rounded-2xl bg-[#343434] p-4 transition-all duration-1000 ${rightMoved ? 'translate-x-[600px] rotate-12 opacity-0' : ''} ${leftMoved ? 'translate-x-[-600px] -rotate-12 opacity-0' : ''} ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}>
        {rawFile.fileType.startsWith('image/') ? (
          <>
            {imgSize && (
              <Image src={src} alt={alt} width={imgSize.width} height={imgSize.height} className="max-h-full max-w-full rounded-2xl object-contain" />
            )}
            {!imgSize && <div className="flex h-64 w-64 items-center justify-center text-white">Loading...</div>}
          </>
        ) : rawFile.fileType.startsWith('video/') ? (
          <>
            <p>Video isn't supported yet</p>
          </>
        ) : (
          <>
            <p>File type unknown! Unable to display</p>
          </>
        )}
        <div className="flex w-full flex-col items-center justify-center gap-2 text-white">
          <h1 className="text-2xl">{fileName}</h1>
          <p className="text-xs">{`Created: ${formatDate(new Date(rawFile.timestamp))}`}</p>
          <CardButtons
            leftButton={() => {
              setLeftMoved(true);
              setCurrentIndex(currentIndex - 1);
              if (index === 0) displayFinishedMessage();
            }}
            rightButton={() => {
              setRightMoved(true);
              setCurrentIndex(currentIndex - 1);
              if (index === 0) displayFinishedMessage();
            }}
            rawFile={rawFile}
          />
        </div>
      </div>
    </>
  );
}
