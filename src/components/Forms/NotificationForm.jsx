import classes from './Form.module.css';
import Radio from './FormElements/Radio';

const NotificationForm = ({ isEnabled }) => {
  console.log(isEnabled);
  return (
    <form className={classes.controls}>
      <h3>Control your notifications</h3>
      <div className="line"></div>
      <p>Enable or disable all notifications for this app.</p>
      <div>
        <Radio id="notificationsOn" name="notifications" label="Enable" />
        <Radio id="notificationsOff" name="notifications" label="Disable" />
      </div>
    </form>
  );
};

export default NotificationForm;
