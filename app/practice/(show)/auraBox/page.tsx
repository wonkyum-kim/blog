'use client';

import styles from './styles.module.css';

export default function AuraBox() {
  return (
    <div className={styles.background}>
      <div className={styles.aura}>
        <div className={styles.box}>
          <h1>What is Lorem Ipsum?</h1>
          <p>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries.`}
          </p>
        </div>
      </div>
    </div>
  );
}
