'use client';

import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';

import CustomInput from '../Forms/FormElements/CustomInput';
import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import ShowPassword from '../Forms/FormElements/ShowPassword';
import classes from './AuthForms.module.css';
import { resetPassword } from '@/actions';

const ResetPasswordForm = () => {
  const { resetToken } = useParams();
  const [formState, formAction] = useFormState(
    resetPassword.bind(null, resetToken),
    { errors: [] }
  );
  return (
    <form className={classes.auth} action={formAction}>
      <ShowPassword />
      <CustomInput
        label="Confirm Password"
        id="passwordConfirm"
        type="password"
        required
      />
      {formState.errors.length > 0 ? (
        <ul>
          {formState.errors.map((error) => (
            <li className="error" key={error}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
      <SubmitBtn className="btn" title="Reset password">
        Reset Password
      </SubmitBtn>
    </form>
  );
};

export default ResetPasswordForm;
