import styles from "./section-heading.module.css";

type SectionHeadingProps = {
  label: string;
  title: string;
  id: string;
};

const SectionHeading = ({ label, title, id }: SectionHeadingProps) => {
  return (
    <div className={styles.headingBlock} data-reveal="heading">
      <p className={styles.label}>
        <span aria-hidden="true" />
        {label}
      </p>

      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
