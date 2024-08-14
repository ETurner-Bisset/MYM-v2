import classes from './Radio.module.css';

const Radio = ({ label, id, name }) => {
  return (
    <div className={classes.radio}>
      <label htmlFor={id}>{label}:</label>
      <input type="radio" id={id} name={name} />
    </div>
  );
};

export default Radio;
