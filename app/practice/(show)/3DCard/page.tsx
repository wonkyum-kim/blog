'use client';

import styles from './3DCard.module.css';
import { MouseEventHandler, useRef } from 'react';

export default function Card3D() {
  const ref = useRef<HTMLPreElement>(null);

  const rotateElement: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!ref || !ref.current) return;
    const x = event.clientX;
    const y = event.clientY;

    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 45;
    const offsetY = ((y - middleY) / middleY) * 45;

    ref.current.style.setProperty('--rotateX', offsetX + 'deg');
    ref.current.style.setProperty('--rotateY', -1 * offsetY + 'deg');
  };

  return (
    <div className={styles.background} onMouseMove={rotateElement}>
      <pre className={styles.pre} ref={ref}>
        <code>
          <span className={styles.selector}>.awesome-layouts</span>
          <span className={styles.punctuation}> &#123;</span>
          <br />
          <span className={styles.property}>&nbsp;&nbsp;display</span>
          <span className={styles.punctuation}>:</span> grid
          <span className={styles.punctuation}>;</span>
          <br />
          <span>&#125; </span>
        </code>
      </pre>
    </div>
  );
}
