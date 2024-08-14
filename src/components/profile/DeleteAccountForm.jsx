'use client';

import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import Button from '../UI/Button';
import CustomInput from '../Forms/FormElements/CustomInput';
import classes from './DeleteAccount.module.css';
import Notification from '../notification/Notification';
import ActionBtns from '../Forms/FormElements/ActionBtns';
import { deleteAccount } from '@/actions';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const DeleteAccountForm = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState([]);
  const { popupState, openPopup } = useContext(PopupContext);

  const handleCheckboxChange = () => {
    setIsChecked((checked) => !checked);
  };

  const handleStartDelete = (e) => {
    e.preventDefault();
    if (isChecked) {
      setShowNotification(true);
    } else {
      setErrors(['You must check the box to proceed.']);
    }
  };

  const handleCancelDelete = () => {
    setShowNotification(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteAccount();
      if (!result) {
        setTimeout(() => {
          window.location.assign('/');
        }, 2000);
        openPopup('Account deleted', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {}
  };

  return (
    <>
      <AnimatePresence>
        {showNotification && (
          <Notification
            title="Are You Sure?"
            text="This will detail all account information. This action can not be undone!"
            actionBtns={
              <ActionBtns
                linkText="Cancel"
                linkTitle="Cancel"
                onCancel={handleCancelDelete}
                title="Delete account"
                btnText="Delete Account"
                action={handleConfirmDelete}
              />
            }
            onClose={handleCancelDelete}
          />
        )}
        {popupState && <Popup />}
      </AnimatePresence>
      <form onSubmit={handleStartDelete} className={classes['delete-form']}>
        <h3>Delete Acount</h3>
        <CustomInput
          label="You must check to box to delete your account. This action will delete
        all account information including all your medication reminders."
          id="delete"
          inputCss={classes['delete-box']}
          type="checkbox"
          required
          onChange={handleCheckboxChange}
        />
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error} className="error">
                {error}
              </li>
            ))}
          </ul>
        )}
        <Button title="Delete account" className="form-btn">
          Delete Account
        </Button>
      </form>
    </>
  );
};

export default DeleteAccountForm;
