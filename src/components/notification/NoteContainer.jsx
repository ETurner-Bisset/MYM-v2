'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import MenuItem from '../Dashboard/MenuItem';
import Notification from './Notification';
import ActionBtns from '../Forms/FormElements/ActionBtns';
import { enableNotifications, disableNotifications } from '@/actions/index';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const NoteContainer = ({ initialState }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] =
    useState(initialState);
  const [showNotification, setShowNotification] = useState(false);
  const { popupState, openPopup } = useContext(PopupContext);

  const handleStartNotification = () => {
    setShowNotification(true);
  };

  const handleCancelNotification = () => {
    setShowNotification(false);
  };

  const handleEnableNotifications = async () => {
    await enableNotifications();
    setIsNotificationEnabled(true);
    setShowNotification(false);
    openPopup('Notifications have been enabled.', 'success');
  };

  const handleDisableNotifications = async () => {
    await disableNotifications();
    setIsNotificationEnabled(false);
    setShowNotification(false);
    openPopup('Notifications have been disabled.', 'success');
  };

  return (
    <>
      <AnimatePresence>
        {showNotification && (
          <Notification
            title={
              isNotificationEnabled
                ? 'Disable Notifications'
                : 'Enable Notifications'
            }
            text={
              isNotificationEnabled
                ? 'This will disable all notifications for your account.'
                : 'This will enable all notifications for your account.'
            }
            actionBtns={
              <ActionBtns
                linkText="Cancel"
                linkTitle="Cancel"
                title={
                  isNotificationEnabled
                    ? 'Disable notifications'
                    : 'Enable notifications'
                }
                btnText={
                  isNotificationEnabled
                    ? 'Disable Notifications'
                    : 'Enable Notifications'
                }
                onCancel={handleCancelNotification}
                action={
                  isNotificationEnabled
                    ? handleDisableNotifications
                    : handleEnableNotifications
                }
              />
            }
            onClose={handleCancelNotification}
          />
        )}
        {popupState && <Popup />}
      </AnimatePresence>
      {!isNotificationEnabled ? (
        <>
          <MenuItem
            isButton
            btnText="Enable Notifications"
            onClick={handleStartNotification}
          />
        </>
      ) : (
        <MenuItem
          isButton
          btnText="Disable Notifications"
          onClick={handleStartNotification}
        />
      )}
    </>
  );
};
export default NoteContainer;
