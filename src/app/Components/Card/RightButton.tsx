'use client';
import { Check } from 'lucide-react';

type RightButtonProps = {
  rightButton: () => void;
};

export default function RightButton({ rightButton }: RightButtonProps) {
  return (
    <div
      className={`rounded-full bg-black p-1`}
      onClick={() => {
        rightButton();
      }}>
      <Check color="#ff538e" />
    </div>
  );
}
