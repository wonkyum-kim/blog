'use client';

import stlyes from './style.module.css';
import { ChangeEventHandler, useRef } from 'react';

export default function StarRating() {
  const ref = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (!ref || !ref.current) return;
    ref.current.style.setProperty('--star-count', event.target.value);
  };

  return (
    <div className={stlyes.background} ref={ref}>
      <div className={stlyes.rating} />
      <p>How was your experience?</p>
      <select className={stlyes.select} onChange={handleChange}>
        <option value='0'>0 Stars</option>
        <option value='1'>1 Star</option>
        <option value='2'>2 Stars</option>
        <option value='3'>3 Stars</option>
        <option value='4'>4 Stars</option>
        <option value='5'>5 Stars</option>
      </select>
    </div>
  );
}
