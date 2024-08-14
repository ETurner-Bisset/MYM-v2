'use client';

import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import SubmitBtn from '../Forms/FormElements/SubmitBtn';
import classes from './ProfileForm.module.css';
import CustomInput from '../Forms/FormElements/CustomInput';
import { updateDetails } from '@/actions/index';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const ProfileForm = ({ title, name, email }) => {
  const { popupState, openPopup } = useContext(PopupContext);
  const [errors, setErrors] = useState([]);

  const handleUpdateDetails = async (formData) => {
    try {
      const result = await updateDetails(formData);
      if (!result) {
        openPopup('Details updated successfully.', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {}
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <form className={classes['info-form']} action={handleUpdateDetails}>
        <h3>Update Account Info</h3>
        <div className={classes.title}>
          <label htmlFor="title">Title:</label>
          <select id="title" name="title" required defaultValue={title}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Mx">Mx</option>
          </select>
        </div>
        <CustomInput
          label="Your Name:"
          id="name"
          type="text"
          required
          defaultValue={name}
        />
        <CustomInput
          label="Your Email:"
          id="email"
          type="email"
          required
          defaultValue={email}
        />
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <SubmitBtn title="Update Info" className="btn">
          Update Info
        </SubmitBtn>
      </form>
    </>
  );
};

export default ProfileForm;
