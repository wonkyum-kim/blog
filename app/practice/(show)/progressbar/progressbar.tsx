'use client';

import styles from './style.module.css';
import { useRef, useEffect } from 'react';

interface ProgressbarProps {
  progress: number;
  size?: number;
  barWidth?: number;
}

export default function Progressbar({
  progress,
  size,
  barWidth,
}: ProgressbarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--progress', progress + '%');
    if (size) ref.current.style.setProperty('--size', size + 'px');
    if (barWidth) ref.current.style.setProperty('--bar-width', barWidth + 'px');
  }, [progress, size, barWidth]);

  return (
    <div
      className={styles.progressbar}
      role='progressbar'
      aria-valuenow={progress}
      aria-live='polite'
      ref={ref}
    />
  );
}
