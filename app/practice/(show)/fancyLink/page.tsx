import styles from './styles.module.css';

export default function FancyLink() {
  return (
    <div className={styles.background}>
      <p className={styles.container}>
        Lorem ipsum dolor sit,{' '}
        <a className={styles['fancy-link-1']} href='#'>
          amet consectetur adipisicing elit stinctio impedit, at, sequi delectus
          aspernatur odit soluta laudantium voluptatibus officiis
        </a>{' '}
        deleniti ipsum sunt quae accusantium earum animi voluptatum facilis
        optio expedita.
      </p>
    </div>
  );
}
