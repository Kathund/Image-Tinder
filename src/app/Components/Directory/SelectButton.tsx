import { useEffect, useState } from 'react';
import SelectDirectory from './SelectDirectory';

type SelectButtonProps = {
  showNextButton: () => void;
};

export default function SelectButton({ showNextButton }: SelectButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [browserName, setBrowserName] = useState('UNKNOWN');

  useEffect(() => {
    setIsClient(true);
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) setBrowserName('Chrome');
    else if (userAgent.includes('Edg')) setBrowserName('Edge');
    else if (userAgent.includes('Firefox')) setBrowserName('Firefox');
    else if (userAgent.includes('Safari')) setBrowserName('Safari');
  }, []);

  return (
    <>
      {isClient && window.showDirectoryPicker ? (
        <SelectDirectory showNextButton={showNextButton} />
      ) : (
        <div className="flex w-full flex-col items-center justify-center text-center text-xs">
          <p>
            Your browser ({browserName}) doesn&apos;t support the <span className="text-pink-400">showDirectoryPicker</span> API
          </p>
          <p>Please use Chrome or Edge. (Tested and built with chrome)</p>
        </div>
      )}
    </>
  );
}
