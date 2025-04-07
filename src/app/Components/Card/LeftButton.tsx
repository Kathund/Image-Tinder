'use client';

import { X } from 'lucide-react';
import type { FileInfo } from '~/app/page';

async function moveImageFile(fileName: string) {
  try {
    if (window.chosenHandle === undefined) return;
    const dataFolderHandle = await window.chosenHandle.getDirectoryHandle('trash', { create: true });
    const fileHandle = await window.chosenHandle.getFileHandle(fileName);
    const newFileHandle = await dataFolderHandle.getFileHandle(fileName, { create: true });
    const file = await fileHandle.getFile();
    const fileBlob = file.slice();
    const writable = await newFileHandle.createWritable();
    await writable.write(fileBlob);
    await writable.close();
    await window.chosenHandle.removeEntry(fileName);
    console.log(`${fileName} moved successfully to trash/${fileName}`);
  } catch (err) {
    console.error('Error moving the image file:', err);
  }
}

type LeftButtonProps = {
  leftButton: () => void;
  rawFile: FileInfo;
};

export default function LeftButton({ leftButton, rawFile }: LeftButtonProps) {
  async function handleButtonClick() {
    await moveImageFile(rawFile.rawFile.name);
    leftButton();
  }

  return (
    <div className={`rounded-full bg-black p-1`} onClick={handleButtonClick}>
      <X color="#ff538e" />
    </div>
  );
}
