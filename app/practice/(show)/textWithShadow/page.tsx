import styles from './styles.module.css';

export default function TextWithShadow() {
  return (
    <div className={styles.background}>
      <div className={styles['page-title']}>
        <span>
          fun <span>(and easy)</span>
        </span>
        <br /> CSS effects
      </div>
    </div>
  );
}
