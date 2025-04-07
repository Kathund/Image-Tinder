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
    if (window.chosenHandle === undefined) return;
    const imgs: FileInfo[] = [];
    for await (const entry of window.chosenHandle.values()) {
      if (entry.kind === 'file') {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();

        // if (['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/webm'].includes(file.type)) {
        if (['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
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

    setImages(imgs.sort((a, b) => a.timestamp - b.timestamp));
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
