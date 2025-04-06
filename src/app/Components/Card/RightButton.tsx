'use client';
import { ArrowRight } from 'lucide-react';

type RightButtonProps = {
  rightButton: () => void;
};

export default function RightButton({ rightButton }: RightButtonProps) {
  return (
    <div className={`rounded-full bg-black p-1`} onClick={rightButton}>
      <ArrowRight color="#ff538e" />
    </div>
  );
}
