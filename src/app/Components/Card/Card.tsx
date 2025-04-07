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

export default function Card({ fileName, src, alt, rawFile, index, displayFinishedMessage, currentIndex, setCurrentIndex }: CardProps) {
  const [shouldShow, setShouldShow] = useState(true);
  const [rightMoved, setRightMoved] = useState(false);
  const [leftMoved, setLeftMoved] = useState(false);
  const [mediaSize, setMediaSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (rawFile.fileType.startsWith('image/')) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setMediaSize({ width: img.width, height: img.height });
      };
    } else if (rawFile.fileType.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = src;
      video.onloadedmetadata = () => {
        setMediaSize({ width: video.videoWidth, height: video.videoHeight });
      };
    }
  }, [src, rawFile.fileType]);

  const isPortrait = mediaSize ? mediaSize.height > mediaSize.width : false;
  const dynamicCardStyle = isPortrait ? 'min-w-64 min-h-96' : 'min-w-96 min-h-64';

  return (
    <>
      <div key={index} className={`absolute ${shouldShow ? 'block' : 'hidden'}`} style={{ zIndex: index }}>
        <div
          className={`flex ${dynamicCardStyle} scale-150 flex-col items-center justify-between rounded-2xl bg-[#343434] p-4 transition-all duration-1000 ${rightMoved ? 'translate-x-[600px] rotate-12 opacity-0' : ''} ${leftMoved ? 'translate-x-[-600px] -rotate-12 opacity-0' : ''} ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}>
          {rawFile.fileType.startsWith('image/') ? (
            mediaSize ? (
              <Image
                src={src}
                alt={alt}
                width={mediaSize.width}
                height={mediaSize.height}
                className="max-h-full max-w-full rounded-2xl object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center text-white">Loading image...</div>
            )
          ) : rawFile.fileType.startsWith('video/') ? (
            mediaSize ? (
              <video
                controls
                src={src}
                width={mediaSize.width}
                height={mediaSize.height}
                className="max-h-full max-w-full rounded-2xl object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center text-white">Loading video...</div>
            )
          ) : (
            <p className="text-white">File type unknown! Unable to display</p>
          )}

          <div className="flex w-full flex-col items-center justify-center gap-2 text-white">
            <h1 className="text-2xl">{fileName}</h1> <p className="text-xs">{`Created: ${formatDate(new Date(rawFile.timestamp))}`}</p>
            <CardButtons
              leftButton={() => {
                setLeftMoved(true);
                setCurrentIndex(currentIndex - 1);
                setTimeout(() => {
                  setShouldShow(false);
                  if (index === 0) displayFinishedMessage();
                }, 1000);
              }}
              rightButton={() => {
                setRightMoved(true);
                setCurrentIndex(currentIndex - 1);
                setTimeout(() => {
                  setShouldShow(false);
                  if (index === 0) displayFinishedMessage();
                }, 1000);
              }}
              rawFile={rawFile}
            />
          </div>
        </div>
      </div>
    </>
  );
}
