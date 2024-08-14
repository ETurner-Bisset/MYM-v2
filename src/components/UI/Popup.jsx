'use client';

import { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import Modal from '../Modal';
import classes from './Popup.module.css';
import { PopupContext } from '@/context/PopupContext';

const Popup = ({ message, status }) => {
  const { closePopup, popupMessage, popupStatus } = useContext(PopupContext);
  let popupCss = classes.popup;

  if (popupStatus === 'success') {
    popupCss += ` ${classes.success}`;
  } else if (popupStatus === 'error') {
    popupCss += ` ${classes.error}`;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      closePopup();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [closePopup]);

  return (
    <Modal onClose={closePopup}>
      <motion.div
        variants={{
          hidden: { y: 100 },
          visible: { y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={popupCss}
        onClick={closePopup}
      >
        {popupMessage}
      </motion.div>
    </Modal>
  );
};
export default Popup;
