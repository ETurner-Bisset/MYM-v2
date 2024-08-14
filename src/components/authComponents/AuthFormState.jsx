'use client';

import { useState } from 'react';

import Button from '../UI/Button';
import classes from './AuthForms.module.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const AuthFormState = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginMode = () => {
    setIsLogin((loginMode) => !loginMode);
  };

  let authFormState = (
    <>
      <LoginForm />
      <Button
        className={classes.modeBtn}
        title="Create an account"
        onClick={toggleLoginMode}
      >
        Create an Account Here
      </Button>
    </>
  );

  if (!isLogin) {
    authFormState = (
      <>
        <SignupForm />
        <Button
          className={classes.modeBtn}
          title="Login here"
          onClick={toggleLoginMode}
        >
          Login Here
        </Button>
      </>
    );
  }

  return <>{authFormState}</>;
};

export default AuthFormState;
