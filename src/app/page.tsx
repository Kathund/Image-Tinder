'use client';

import { useState } from 'react';
import BaseHomePage from './Components/BaseHomePage';
import Cards from './Components/Cards';

export type FileInfo = {
  rawFile: FileSystemHandle;
  name: string;
  path: string;
  timestamp: number;
  size: number;
  fileType: string;
};

export default function HomePage() {
  const [shouldShowHomepage, setShowHomePage] = useState(true);
  const [images, setImgs] = useState<FileInfo[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-600 text-white">
      <div className={`${shouldShowHomepage ? 'opacity-100' : 'opacity-0'}`}>
        <BaseHomePage setShowHomePage={() => setShowHomePage(false)} setImages={setImgs} />
      </div>
      <div className={`${shouldShowHomepage ? 'opacity-0' : 'opacity-100'} absolute flex items-center justify-center`}>
        <Cards images={images} />
      </div>
    </main>
  );
}
