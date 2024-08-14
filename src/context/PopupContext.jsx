'use client';
import { createContext, useState } from 'react';

export const PopupContext = createContext({
  popupState: false,
  popupMessage: '',
  popupStatus: '',
  openPopup: () => {},
  closePopup: () => {},
});

export const PopupContextProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupStatus, setPopupStatus] = useState('');

  const handleOpenPopup = (message, status) => {
    setShowPopup(true);
    setPopupMessage(message);
    setPopupStatus(status);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const cxtValue = {
    popupState: showPopup,
    popupMessage,
    popupStatus,
    openPopup: handleOpenPopup,
    closePopup: handleClosePopup,
  };

  return (
    <PopupContext.Provider value={cxtValue}>{children}</PopupContext.Provider>
  );
};
