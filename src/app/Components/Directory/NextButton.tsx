/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import { ArrowRight } from 'lucide-react';
import type { FileInfo } from '~/app/page';

export default function NextButton({
  shouldDisplay,
  shouldDisplayHomepage,
  setImages
}: {
  shouldDisplay: boolean;
  shouldDisplayHomepage: () => void;
  setImages: (files: FileInfo[]) => void;
}) {
  async function handleNextClick() {
    const files = [];
    const imgs: FileInfo[] = [];
    // @ts-expect-error
    for await (const entry of window.chosenHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        if (file.type === 'image/png') {
          imgs.push({
            rawFile: entry,
            name: file.name.split('.')[0] ?? 'UNKNOWN',
            path: URL.createObjectURL(file),
            timestamp: file.lastModified,
            size: file.size
          });
        }
      }
    }

    console.log(files.length);
    setImages(imgs.sort((a, b) => a.timestamp - b.timestamp));
    console.log(imgs);
    shouldDisplayHomepage();
  }

  return (
    <>
      <div
        onClick={handleNextClick}
        className={`${shouldDisplay ? 'opacity-100' : 'opacity-0'} z-20 flex h-8 w-96 flex-row items-center justify-between rounded-2xl bg-black p-3 transition-all duration-500`}>
        <p>Next</p>
        <ArrowRight />
      </div>
    </>
  );
}
