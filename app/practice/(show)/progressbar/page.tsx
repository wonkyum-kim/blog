'use client';

import styles from './style.module.css';
import { MouseEventHandler, useRef, useState } from 'react';

export default function Progressbar() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const updateProgress = (p: number) => {
    if (!ref.current) return;
    ref.current.style.setProperty('--progress', p + '%');
    setProgress(p);
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickedElement = event.target as HTMLElement;
    const progressValue = clickedElement.getAttribute('data-progress');
    if (!progressValue) return;

    if (isNaN(+progressValue)) {
      simulateUpload();
      return;
    }

    setProgress(+progressValue);
    updateProgress(+progressValue);
  };

  const simulateUpload = () => {
    if (!ref.current) return;
    let p = 0;
    updateProgress(p);
    const timerId = setInterval(() => {
      p += 5;
      updateProgress(p);
      if (p == 100) clearInterval(timerId);
    }, 500);
  };

  return (
    <div className={styles.background}>
      <div
        className={styles.progressbar}
        role='progressbar'
        aria-valuenow={progress}
        aria-live='polite'
        ref={ref}
      />
      <div className={styles['testing-ground']} onClick={clickHandler}>
        <h2>Testing ground</h2>
        <button data-progress='0'>0%</button>
        <button data-progress='25'>25%</button>
        <button data-progress='57'>57%</button>
        <button data-progress='82'>82%</button>
        <button data-progress='100'>100%</button>
        <button data-progress='fake-upload'>
          Simulate a thing that takes a long time to do
        </button>
      </div>
    </div>
  );
}
