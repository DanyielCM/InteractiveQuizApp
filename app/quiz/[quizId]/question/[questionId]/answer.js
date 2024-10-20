import classes from './page.module.css';

export default function Answer({
  children,
  handleAnswer,
  additionalClass,
  isSelected,
}) {
  return (
    <p
      className={`${classes.answer} ${isSelected ? additionalClass : ''}`}
      onClick={() => handleAnswer(children)}
    >
      {children}
    </p>
  );
}
