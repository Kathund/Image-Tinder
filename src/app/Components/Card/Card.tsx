'use client';

import { useState } from 'react';
import Image from 'next/image';
import CardButtons from './CardButtons';
import type { FileInfo } from '~/app/page';

type CardProps = {
  fileName: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  rawFile: FileInfo;
};

export default function Card({ fileName, src, alt, width, height, rawFile }: CardProps) {
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

  return (
    <>
      <div
        className={`flex h-96 w-64 scale-150 flex-col items-center justify-between rounded-2xl bg-[#343434] p-4 transition-all duration-1000 ${rightMoved ? 'translate-x-[600px] rotate-12 opacity-0' : ''} ${leftMoved ? 'translate-x-[-600px] -rotate-12 opacity-0' : ''}`}>
        <Image src={src} alt={alt} width={width} height={height} className={'rounded-2xl'} />
        <div className="flex w-full flex-col items-center justify-center gap-2 text-white">
          <h1 className="text-2xl">{fileName}</h1>
          <p className="text-xs">{`Created: ${formatDate(new Date(rawFile.timestamp))}`}</p>
          <CardButtons leftButton={() => setLeftMoved(true)} rightButton={() => setRightMoved(true)} rawFile={rawFile} />
        </div>
      </div>
    </>
  );
}
