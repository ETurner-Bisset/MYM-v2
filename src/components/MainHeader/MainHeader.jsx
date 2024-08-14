import classes from './MainHeader.module.css';

const MainHeader = ({ title, icon }) => {
  return (
    <header className={classes.header}>
      <h1>
        {title} {icon}
      </h1>
    </header>
  );
};

export default MainHeader;
