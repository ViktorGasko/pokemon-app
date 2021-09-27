import styles from "./LoadSpinner.module.css";

const LoadSpinner = () => {
  return (
    <div className={styles["load-spinner-wrap"]}>
      <div className={styles["load-spinner"]}></div>
    </div>
  );
};

export default LoadSpinner;
