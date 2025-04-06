'use client';
import type { FileInfo } from '~/app/page';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

type CardButtonsProps = {
  rawFile: FileInfo;
  leftButton: () => void;
  rightButton: () => void;
};

export default function CardButtons({ leftButton, rightButton, rawFile }: CardButtonsProps) {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <LeftButton leftButton={leftButton} rawFile={rawFile} />
        <RightButton rightButton={rightButton} />
      </div>
    </>
  );
}
