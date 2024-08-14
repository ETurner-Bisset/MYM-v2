'use client';

import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import CustomInput from './FormElements/CustomInput';
import classes from './Form.module.css';
import Textarea from './FormElements/Textarea';
import FormBtns from './FormElements/FormBtns';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';
import { addMed } from '@/actions';

const MedsForm = () => {
  const { popupState, openPopup } = useContext(PopupContext);
  const [errors, setErrors] = useState([]);

  const handleAddMed = async (formData) => {
    try {
      const result = await addMed(formData);
      if (!result) {
        openPopup('Medication added successfully.', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {}
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <form action={handleAddMed}>
        <h3>Add Medication Form</h3>
        <CustomInput
          label="Medication Name:"
          id="name"
          required
          type="text"
          placeholder="Metformin"
        />
        <CustomInput
          label="Medication Dose:"
          id="dose"
          required
          type="text"
          placeholder="500mg"
        />
        <CustomInput label="Order Date:" id="orderDate" required type="date" />
        <p>How often does your medication need ordering?</p>
        <div className={classes.container}>
          <label htmlFor="frequency">Frequency:</label>
          <select id="frequency" name="frequency">
            <option value="Two Weeks">Every Two Weeks</option>
            <option value="Month">Every Month</option>
            <option value="Two Months">Every Two Months</option>
          </select>
        </div>
        <CustomInput
          label="Pharmacy Details:"
          id="pharmacy"
          required
          type="text"
          placeholder="www.pharmacy.com"
        />
        <p>When do your want to be reminded to take your medication?</p>
        <div className={classes.time}>
          <div>
            <CustomInput label="First Dose:" id="firstDose" type="time" />
          </div>
          <div>
            <CustomInput label="Second Dose:" id="secondDose" type="time" />
          </div>
          <div>
            <CustomInput label="Third Dose:" id="thirdDose" type="time" />
          </div>
          <div>
            <CustomInput label="Fourth Dose:" id="fourthDose" type="time" />
          </div>
        </div>
        <Textarea
          label="Instructions:"
          id="instructions"
          required
          rows="5"
          placeholder="Take 3 times a day with meals..."
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
        <FormBtns
          href="/meds"
          linkText="Cancel"
          title="Add medication"
          btnText="Add Medication"
        />
      </form>
    </>
  );
};
export default MedsForm;
