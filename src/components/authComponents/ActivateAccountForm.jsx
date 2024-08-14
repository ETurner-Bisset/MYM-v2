'use client';

import { useParams } from 'next/navigation';
import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import SubmitBtn from '@/components/Forms/FormElements/SubmitBtn';
import { accountActivation } from '@/actions';
import Popup from '@/components/UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const ActivateAccountForm = () => {
  const [errors, setErrors] = useState([]);
  const { jwtToken } = useParams();
  const { popupState, openPopup } = useContext(PopupContext);

  const handleAccountActivation = async () => {
    try {
      const result = await accountActivation(jwtToken);
      if (!result) {
        setTimeout(() => {
          window.location.assign('/');
        }, 2000);
        openPopup('Account activated. Please login.', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <form action={handleAccountActivation} className="hidden-form">
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li className="error" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}
        {errors.length === 0 && (
          <SubmitBtn title="Activate account">Activate Account</SubmitBtn>
        )}
      </form>
    </>
  );
};

export default ActivateAccountForm;
