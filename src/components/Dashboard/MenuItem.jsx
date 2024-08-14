import NavLink from '../NavLink';
import Button from '../UI/Button';
import classes from './Menu.module.css';

const MenuItem = ({
  icon,
  linkText,
  href,
  title,
  isButton,
  btnText,
  onClick,
}) => {
  return (
    <>
      <li className={isButton ? classes.noteBtn : classes.li}>
        {isButton ? (
          <Button onClick={onClick} title={title}>
            {btnText}
          </Button>
        ) : (
          <NavLink href={href} title={title}>
            {icon}
            {linkText}
          </NavLink>
        )}
      </li>
      <div className="line"></div>
    </>
  );
};
export default MenuItem;
