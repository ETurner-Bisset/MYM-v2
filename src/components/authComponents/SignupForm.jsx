'use client';

import { useFormState } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import CustomInput from '../Forms/FormElements/CustomInput';
import classes from './Signup.module.css';
import ShowPassword from '../Forms/FormElements/ShowPassword';
import Button from '../UI/Button';
import { signup } from '@/actions';

const SignupForm = () => {
  const [formState, formAction] = useFormState(signup, {
    errors: [],
  });

  return (
    <form className={classes.signup} action={formAction}>
      <h2>Create an Account</h2>
      <div className={classes.title}>
        <label htmlFor="title">Title:</label>
        <select id="title" name="title" required>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
          <option value="Mx">Mx</option>
        </select>
      </div>
      <CustomInput label="Your Name:" id="name" type="text" required />
      <CustomInput label="Your Email:" id="email" type="email" required />
      <ShowPassword />
      <CustomInput
        label="Confirm Password:"
        id="passwordConfirm"
        type="password"
        required
      />
      {formState?.errors.length > 0 && (
        <ul>
          {formState.errors.map((error) => (
            <li className="error" key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <SubmitBtn title="Create an account" className="btn">
        Create an Account
      </SubmitBtn>
      <Button
        onClick={async () => await signIn('google', { callbackUrl: '/meds' })}
        type="button"
        className="googleBtn"
      >
        <FcGoogle />
        Signup with Google
      </Button>
    </form>
  );
};

export default SignupForm;
