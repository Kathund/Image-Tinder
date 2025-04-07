import { useState } from 'react';
import NextButton from './Directory/NextButton';
import SelectButton from './Directory/SelectButton';
import type { FileInfo } from '../page';

type BaseHomePageProps = {
  setShowHomePage: () => void;
  setImages: (files: FileInfo[]) => void;
};

export default function BaseHomePage({ setShowHomePage, setImages }: BaseHomePageProps) {
  const [shouldDisplayNextButton, setShouldDisplayNextButton] = useState(false);
  return (
    <div className="flex scale-200 flex-col items-center gap-2">
      <div className="flex h-32 w-96 flex-col items-center rounded-2xl bg-[#343434]">
        <div className="flex h-1/2 w-full items-center justify-center">
          <h1 className="text-2xl font-bold">Image Cleaner!</h1>
        </div>
        <div className="flex h-1/2 w-full items-center justify-center">
          <SelectButton showNextButton={() => setShouldDisplayNextButton(true)} />
        </div>
      </div>
      <NextButton shouldDisplay={shouldDisplayNextButton} shouldDisplayHomepage={setShowHomePage} setImages={setImages} />
    </div>
  );
}
