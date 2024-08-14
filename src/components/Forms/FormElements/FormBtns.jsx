import NavLink from '@/components/NavLink';
import classes from './FormBtns.module.css';
import SubmitBtn from './SubmitBtn';
import Button from '@/components/UI/Button';

const FormBtns = ({ href, linkText, title, btnText, onClick }) => {
  return (
    <div className={classes['form-actions']}>
      <NavLink href={href}>{linkText}</NavLink>
      {onClick ? (
        <Button title={title} className={classes.btn} onClick={onClick}>
          {btnText}
        </Button>
      ) : (
        <SubmitBtn title={title} className={classes.btn}>
          {btnText}
        </SubmitBtn>
      )}
    </div>
  );
};

export default FormBtns;
