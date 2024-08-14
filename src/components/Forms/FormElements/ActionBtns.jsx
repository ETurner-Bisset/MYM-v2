import Button from '../../UI/Button';
import classes from './ActionBtns.module.css';
import SubmitBtn from './SubmitBtn';

const ActionBtns = ({ linkTitle, onCancel, title, btnText, action }) => {
  return (
    <>
      <div className={classes.actions}>
        <Button
          className={classes['text-btn']}
          title={linkTitle}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <form className="hidden-form" action={action}>
          <SubmitBtn title={title} className={classes.btn}>
            {btnText}
          </SubmitBtn>
        </form>
      </div>
    </>
  );
};

export default ActionBtns;
