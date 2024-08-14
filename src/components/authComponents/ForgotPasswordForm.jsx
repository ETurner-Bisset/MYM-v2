'use client';

import { useFormState } from 'react-dom';

import CustomInput from '../Forms/FormElements/CustomInput';
import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import classes from './AuthForms.module.css';
import { forgotPassword } from '@/actions';

const ForgotPasswordForm = () => {
  const [formState, formAction] = useFormState(forgotPassword, {
    errors: [],
  });

  return (
    <form className={classes.auth} action={formAction}>
      <CustomInput label="Your Email:" id="email" required />
      {formState.errors.length > 0 ? (
        <ul>
          {formState.errors.map((error) => (
            <li className="error" key={error}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
      <SubmitBtn title="Send reset link" className="btn">
        Send Reset Link
      </SubmitBtn>
    </form>
  );
};

export default ForgotPasswordForm;
