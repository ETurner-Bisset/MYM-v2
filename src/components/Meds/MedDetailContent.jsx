'use client';

import { useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import classes from './MedDetailsContent.module.css';
import { formatDate } from '@/utils/formatDate';
import MedContentItem from './MedContentItem';
import Notification from '../notification/Notification';
import ActionBtns from '../Forms/FormElements/ActionBtns';
import FormBtns from '@/components/Forms/FormElements/FormBtns';
import { deleteMed, toggleOrderReminder, toggleDoseReminder } from '@/actions';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const MedDetailContent = ({ med }) => {
  const [showNotification, setShowNotifiction] = useState(false);
  const { popupState, openPopup } = useContext(PopupContext);

  const handleStartDelete = () => {
    setShowNotifiction(true);
  };

  const handleCancelDelete = () => {
    setShowNotifiction(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteMed(med.id);
      if (!result) {
        openPopup('Medication deleted successfully.', 'success');
      } else {
        openPopup(result.error, 'error');
      }
    } catch (error) {}
  };

  const handleOrderChange = async () => {
    try {
      const result = await toggleOrderReminder(med.id);
      if (!result) {
        openPopup('Order reminder updated.', 'success');
      } else {
        openPopup(result.error, 'error');
      }
    } catch (error) {
      openPopup('Something went wrong.', 'error');
    }
  };

  const handleDoseChange = async () => {
    try {
      const result = await toggleDoseReminder(med.id);
      if (!result) {
        openPopup('Reminder to take your medication updated.', 'success');
      } else {
        openPopup(result.error, 'error');
      }
    } catch (error) {
      openPopup('Something went wrong.', 'error');
    }
  };

  return (
    <>
      <AnimatePresence>
        {showNotification && (
          <Notification
            title="Are You Sure?"
            text="This will delete this medication, including all it's reminders. This action cannot be undone."
            actionBtns={
              <ActionBtns
                linkText="Cancel"
                linkTitle="Cancel"
                onCancel={handleCancelDelete}
                title="Delete medication"
                btnText="Delete Medication"
                action={handleConfirmDelete}
              />
            }
            onClose={handleCancelDelete}
          />
        )}
        {popupState && <Popup />}
      </AnimatePresence>
      <FormBtns
        href={`/meds/${med?.slug}/edit`}
        linkText="Edit"
        title="Delete"
        btnText="Delete"
        onClick={handleStartDelete}
      />
      <section className={classes.section}>
        <MedContentItem
          label="Medication Name:"
          value={med?.name}
          HtmlElement="title"
        />
        <MedContentItem label="Dose:" value={med?.dose} />
        <MedContentItem
          label="Next Reminder Date:"
          value={formatDate(med?.orderDate)}
          HtmlElement="time"
        />
        <MedContentItem
          label="Reminder Frequency:"
          value={`Every ${med?.frequency}`}
        />
        {!med?.isOrderReminder ? (
          <p>Order reminders are OFF. Check the box to turn them ON.</p>
        ) : (
          <p>Order reminders are ON. Uncheck the box to turn them OFF.</p>
        )}
        <input
          type="checkbox"
          onChange={handleOrderChange}
          defaultChecked={med?.isOrderReminder}
          className={classes.checkbox}
        />
        <div className="line"></div>
        <MedContentItem label="Pharmcy Details:" value={med?.pharmacy} />
        <p className={classes.dose}>Dose times.</p>
        {med?.firstDose !== '' && (
          <MedContentItem
            label="First Dose:"
            value={med?.firstDose}
            HtmlElement="time"
          />
        )}
        {med?.secondDose !== '' && (
          <MedContentItem
            label="Second Dose:"
            value={med?.secondDose}
            HtmlElement="time"
          />
        )}
        {med?.thirdDose !== '' && (
          <MedContentItem
            label="Third Dose:"
            value={med?.thirdDose}
            HtmlElement="time"
          />
        )}
        {med?.fourthDose !== '' && (
          <MedContentItem
            label="Fourth Dose:"
            value={med?.fourthDose}
            HtmlElement="time"
          />
        )}
        {!med?.isDoseReminder ? (
          <p>
            Reminders to take your medication are OFF. Check the box to turn
            them ON.
          </p>
        ) : (
          <p>
            Reminders to take your medication are ON. Uncheck the box to turn
            them OFF.
          </p>
        )}
        <input
          type="checkbox"
          onChange={handleDoseChange}
          defaultChecked={med?.isDoseReminder}
          className={classes.checkbox}
        />
        <div className="line"></div>
        <MedContentItem
          className={classes.instructions}
          label="Instructions:"
          value={med?.instructions}
        />
      </section>
    </>
  );
};

export default MedDetailContent;
