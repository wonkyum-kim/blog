'use client';

import Progressbar from './progressbar';
import styles from './style.module.css';
import { MouseEventHandler, useState } from 'react';

export default function Page() {
  const [progress, setProgress] = useState(0);

  const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickedElement = event.target as HTMLElement;
    const progressValue = clickedElement.getAttribute('data-progress');
    if (!progressValue) return;
    if (isNaN(+progressValue)) simulateUpload();
    else setProgress(+progressValue);
  };

  const simulateUpload = () => {
    let p = 0;
    setProgress(p);
    const timerId = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p == 100) clearInterval(timerId);
    }, 500);
  };

  return (
    <div className={styles.background}>
      <Progressbar progress={progress} />
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
