import classes from './Features.module.css';

const Feature = ({ icon, text }) => {
  return (
    <div className={classes.feature}>
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default Feature;
