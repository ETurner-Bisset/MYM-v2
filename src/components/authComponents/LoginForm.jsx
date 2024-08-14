'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import CustomInput from '../Forms/FormElements/CustomInput';

import classes from './Login.module.css';
import ShowPassword from '../Forms/FormElements/ShowPassword';
import { loginValidation } from '@/utils/inputValidation';
import NavLink from '../NavLink';
import Button from '../UI/Button';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleLogin = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = loginValidation(email, password);

    if (errors.length > 0) {
      setErrors(errors);
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result.error) {
        router.push('/meds');
      } else {
        setErrors([result.error]);
      }
    } catch (error) {}
  };

  return (
    <>
      <form className={classes.login} action={handleLogin}>
        <h2>Login</h2>
        <CustomInput label="Your Email:" id="email" type="email" required />
        <ShowPassword />
        {errors.length > 0 ? (
          <ul>
            {errors.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}
        <NavLink href="/forgotPassword">Forgot Password?</NavLink>
        <SubmitBtn title="Login" className="btn">
          Login
        </SubmitBtn>
        <Button
          onClick={async () => await signIn('google', { callbackUrl: '/meds' })}
          type="button"
          className="googleBtn"
        >
          <FcGoogle />
          Login with Google
        </Button>
      </form>
    </>
  );
};
export default LoginForm;
