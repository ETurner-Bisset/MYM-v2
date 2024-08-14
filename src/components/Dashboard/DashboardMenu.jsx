import Menu from './Menu';
import classes from './Dashboard.module.css';

const DashboardMenu = () => {
  return (
    <ul className={classes.ul}>
      <Menu />
    </ul>
  );
};

export default DashboardMenu;
