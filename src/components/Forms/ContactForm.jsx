'use client';

import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import CustomInput from './FormElements/CustomInput';
import Textarea from './FormElements/Textarea';
import FormBtns from './FormElements/FormBtns';
import { contactMessage } from '@/actions';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const ContactForm = () => {
  const { popupState, openPopup } = useContext(PopupContext);
  const [errors, setErrors] = useState([]);
  const { data: session } = useSession();

  const handleSendMessage = async (formData) => {
    try {
      const result = await contactMessage(formData);
      if (!result) {
        openPopup('Message sent.', 'success');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {}
  };

  return (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <form action={handleSendMessage}>
        <CustomInput
          label="Your Name:"
          id="userName"
          type="text"
          required
          defaultValue={session?.user.name}
        />
        <CustomInput
          label="Your Email:"
          id="userEmail"
          type="email"
          required
          defaultValue={session?.user.email}
        />
        <Textarea label="Your Message:" id="message" required rows="7" />
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
          href="/"
          linkText="Cancel"
          title="Send message"
          btnText="Send Message"
        />
      </form>
    </>
  );
};
export default ContactForm;
