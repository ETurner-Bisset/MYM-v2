'use client';

import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import CustomInput from './FormElements/CustomInput';
import Textarea from './FormElements/Textarea';
import classes from './Form.module.css';
import FormBtns from './FormElements/FormBtns';
import { editMed } from '@/actions';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const EditMedForm = ({ med }) => {
  const { popupState, openPopup } = useContext(PopupContext);
  const [errors, setErrors] = useState([]);

  const handleEditMed = async (formData) => {
    try {
      const result = await editMed(med.id, formData);
      if (!result) {
        openPopup('Medication edited successfully.', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {}
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>{' '}
      <form action={handleEditMed}>
        <CustomInput
          label="Medication Name:"
          id="name"
          required
          defaultValue={med.name}
          type="text"
        />
        <CustomInput
          label="Medication Dose:"
          id="dose"
          required
          defaultValue={med.dose}
          type="text"
        />
        <CustomInput
          label="Next Order Date:"
          id="orderDate"
          required
          defaultValue={new Date(med.orderDate).toLocaleDateString('en-CA')}
          type="date"
        />
        <p>How often does your medication need ordering?</p>
        <div className={classes.container}>
          <label htmlFor="frequency">Frequency:</label>
          <select id="frequency" name="frequency" defaultValue={med.frequency}>
            <option value="Two Weeks">Every Two Weeks</option>
            <option value="Month">Every Month</option>
            <option value="Two Months">Every Two Months</option>
          </select>
        </div>
        <CustomInput
          label="Pharmacy Details:"
          id="pharmacy"
          required
          defaultValue={med.pharmacy}
          type="text"
        />
        <p>When do your want to be reminded to take your medication?</p>
        <div className={classes.time}>
          <div>
            <CustomInput
              label="First Dose:"
              id="firstDose"
              type="time"
              defaultValue={med.firstDose}
            />
          </div>
          <div>
            <CustomInput
              label="Second Dose:"
              id="secondDose"
              type="time"
              defaultValue={med.secondDose}
            />
          </div>
          <div>
            <CustomInput
              label="Third Dose:"
              id="thirdDose"
              type="time"
              defaultValue={med.thirdDose}
            />
          </div>
          <div>
            <CustomInput
              label="Fourth Dose:"
              id="fourthDose"
              type="time"
              defaultValue={med.fourthDose}
            />
          </div>
        </div>
        <Textarea
          label="Instructions:"
          id="instructions"
          required
          rows="5"
          defaultValue={med.instructions}
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
          href={`/meds/${med.slug}`}
          linkText="Cancel"
          title="Save changes"
          btnText="Save Changes"
        />
      </form>
    </>
  );
};
export default EditMedForm;
