'use client';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

type CardButtonsProps = {
  leftButton: () => void;
  rightButton: () => void;
};

export default function CardButtons({ leftButton, rightButton }: CardButtonsProps) {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <LeftButton leftButton={leftButton} />
        <RightButton rightButton={rightButton} />
      </div>
    </>
  );
}
