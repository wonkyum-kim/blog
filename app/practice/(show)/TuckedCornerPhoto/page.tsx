import styles from './styles.module.css';

// https://www.youtube.com/watch?v=3T-RETzcqpU

export default function TuckedCornerPhoto() {
  return (
    <div className={styles.background}>
      <figure className={styles.photo}>
        <img
          src='https://assets.codepen.io/1506195/portrait-woman-unsplash.jpg'
          alt='test'
          width='400px'
        />
        <figcaption>Test</figcaption>
      </figure>
    </div>
  );
}
