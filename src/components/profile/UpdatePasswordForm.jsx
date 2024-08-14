'use client';

import { useState, useContext } from 'react';
import { signOut } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';

import classes from './UpdatePasswordForm.module.css';
import CustomInput from '../Forms/FormElements/CustomInput';
import ShowPassword from '../Forms/FormElements/ShowPassword';
import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import { PopupContext } from '@/context/PopupContext';
import Popup from '../UI/Popup';
import { updatePassword } from '@/actions';
import { updatePasswordValidation } from '@/utils/inputValidation';

const UpdatePasswordForm = () => {
  const [errors, setErrors] = useState([]);
  const { popupState, openPopup } = useContext(PopupContext);

  const handleUpdatePassword = async (formData) => {
    const passwordCurrent = formData.get('passwordCurrent');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    const errors = updatePasswordValidation(
      passwordCurrent,
      password,
      passwordConfirm
    );

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const result = await updatePassword(passwordCurrent, password);
      if (result.errors?.length > 0) {
        setErrors(result.errors);
      } else {
        setTimeout(async () => {
          await signOut({ redirect: false });
          window.location.assign('/');
        }, 2000);
        openPopup('Password updated. Please login again.', 'success');
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <form className={classes['password-form']} action={handleUpdatePassword}>
        <h3>Update Password</h3>
        <CustomInput
          label="Current Pasword:"
          id="passwordCurrent"
          type="password"
          required
        />
        <ShowPassword />
        <CustomInput
          label="Comfirm Password:"
          id="passwordConfirm"
          type="password"
          required
        />
        {errors.length > 0 ? (
          <ul>
            {errors.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}
        <SubmitBtn title="Update password" className="btn">Update Password</SubmitBtn>
      </form>
    </>
  );
};

export default UpdatePasswordForm;
