'use client';

import { useState } from 'react';
import { IoEyeOff, IoEye } from 'react-icons/io5';

import Button from '../../UI/Button';

const ShowPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleShowPassword = () => {
    setPasswordVisible((password) => !password);
  };

  return (
    <>
      <label htmlFor="password">Password:</label>
      <div className="input-div">
        <input
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          required
        />
        <Button
          title={passwordVisible ? 'Hide Password' : 'Show Password'}
          onClick={toggleShowPassword}
          type="button"
          className="icon"
        >
          {passwordVisible ? <IoEye /> : <IoEyeOff />}
        </Button>
      </div>
    </>
  );
};
export default ShowPassword;
