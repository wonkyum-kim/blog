'use client';

import styles from './style.module.css';

export default function ImageHighlight() {
  return (
    <div className={styles.background}>
      <div className={styles['speakers-grid']}>
        <ul>
          <li>
            <a href=''>
              Miriam Suzanne
              <img src='https://assets.codepen.io/308367/miriam.jpg' alt='' />
            </a>
            : MC
          </li>
          <li>
            <a href=''>
              Jeremy Keith
              <img src='https://assets.codepen.io/308367/jeremy.jpg' alt='' />
            </a>
            : MC
          </li>
          <li>
            <a href=''>
              Tab Atkins
              <img src='https://assets.codepen.io/308367/tab.jpg' alt='' />
            </a>
            : Anchor Positioning
          </li>
          <li>
            <a href=''>
              Josh Comeau
              <img src='https://assets.codepen.io/308367/josh.jpg' alt='' />
            </a>
            : How to Teach CSS
          </li>
          <li>
            <a href=''>
              Rachel Andrew
              <img src='https://assets.codepen.io/308367/rachel.jpg' alt='' />
            </a>
          </li>
          <li>
            <a href=''>
              Matthias Ott
              <img src='https://assets.codepen.io/308367/matthias.jpg' alt='' />
            </a>
          </li>
          <li>
            <a href=''>
              Stephen Hay
              <img src='https://assets.codepen.io/308367/stephen.jpg' alt='' />
            </a>
          </li>
          <li>
            <a href=''>
              Julia Miocene
              <img src='https://assets.codepen.io/308367/julia.jpg' alt='' />
            </a>
            : Character Modeling in CSS
          </li>
          <li>
            <a href=''>
              Roel Nieskens
              <img src='https://assets.codepen.io/308367/roel.jpg' alt='' />
            </a>
            : Typography
          </li>
          <li>
            <a href=''>
              Roma Komarov
              <img src='https://assets.codepen.io/308367/roma.jpg' alt='' />
            </a>
            : Impactful Experimentation
          </li>
          <li>
            <a href=''>
              Sarah Dayan
              <img src='https://assets.codepen.io/308367/sarah.jpg' alt='' />
            </a>
            : Utility First CSS
          </li>
          <li>
            <a href=''>
              Carmen Ansio
              <img src='https://assets.codepen.io/308367/carmen.jpg' alt='' />
            </a>
            : Scroll-Enhanced Experiences
          </li>
          <li>
            <a href=''>
              Kevin Powell
              <img src='https://assets.codepen.io/308367/kevin.jpg' alt='' />
            </a>
            : Writing robust CSS
          </li>
        </ul>
      </div>
    </div>
  );
}
