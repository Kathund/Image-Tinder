'use client';
import { ArrowLeft } from 'lucide-react';

type LeftButtonProps = {
  leftButton: () => void;
};

export default function LeftButton({ leftButton }: LeftButtonProps) {
  return (
    <div className={`rounded-full bg-black p-1`} onClick={leftButton}>
      <ArrowLeft color="#ff538e" />
    </div>
  );
}
