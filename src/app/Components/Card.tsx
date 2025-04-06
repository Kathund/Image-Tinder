'use client';

import { useState } from 'react';
import CardButtons from './Card/CardButtons';
import Image from 'next/image';

type CardProps = {
  fileName: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
};

export default function Card({ fileName, src, alt, width, height, index }: CardProps) {
  const [rightMoved, setRightMoved] = useState(false);
  const [leftMoved, setLeftMoved] = useState(false);

  return (
    <>
      <div
        className={`flex h-96 w-64 scale-150 flex-col items-center justify-between rounded-2xl bg-[#343434] p-4 transition-all duration-1000 ${rightMoved ? 'translate-x-[600px] opacity-0' : ''} ${leftMoved ? 'translate-x-[-600px] opacity-0' : ''}`}>
        <Image src={src} alt={alt} width={width} height={height} className={'rounded-2xl'} />
        <div className="flex w-full flex-col items-center justify-center gap-2 text-white">
          <h1 className="text-2xl">{fileName}</h1>
          <h1>{`Image ${index + 1}`}</h1>
          <CardButtons leftButton={() => setLeftMoved(true)} rightButton={() => setRightMoved(true)} />
        </div>
      </div>
    </>
  );
}
