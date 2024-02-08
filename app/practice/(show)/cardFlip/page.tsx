'use client';

import clsx from 'clsx';
import { useState } from 'react';
import styles from './cardFlip.module.css';

function Scene({ children }: { children: React.ReactNode }) {
  return <div className={styles.scene}>{children}</div>;
}

function Card({
  children,
  handleFlip,
  isFront,
}: {
  children: React.ReactNode;
  handleFlip: () => void;
  isFront: boolean;
}) {
  return (
    <div
      onClick={handleFlip}
      className={clsx(styles.card, !isFront && styles['is-flipped'])}
    >
      {children}
    </div>
  );
}

function CardFace({ side }: { side: string }) {
  return (
    <div
      className={clsx(
        styles.card__face,
        side === 'front' && styles['card__face--front'],
        side === 'back' && styles['card__face--back']
      )}
    >
      {side}
    </div>
  );
}

export default function CardFlip() {
  const [isFront, setIsFront] = useState(true);

  const handleFlip = () => {
    setIsFront((prev) => !prev);
  };

  return (
    <div className={styles.background}>
      <Scene>
        <Card handleFlip={handleFlip} isFront={isFront}>
          <CardFace side='front' />
          <CardFace side='back' />
        </Card>
      </Scene>
    </div>
  );
}
