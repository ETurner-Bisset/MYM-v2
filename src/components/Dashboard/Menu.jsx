'use client';

import { FaUnlock } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { FaInfo } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import MenuItem from './MenuItem';
import NoteContainer from '../notification/NoteContainer';
import LoadingSpinner from '../UI/LoadingSpinner';
import Popup from '../UI/Popup';
import { PopupContext } from '@/context/PopupContext';

const Menu = () => {
  const session = useSession();
  const { popupState, openPopup } = useContext(PopupContext);

  const handleLogout = async () => {
    try {
      const result = await signOut({ redirect: false });
      if (!result.error) {
        openPopup('Logged out.', 'success');
        window.location.assign('/');
      } else {
        openPopup('Could not log out.', 'error');
      }
    } catch (error) {}
  };

  if (session.status === 'loading') {
    return (
      <div className="loading">
        <LoadingSpinner height="100" width="100" color="#c7dcff" />
      </div>
    );
  }

  let authContent = (
    <>
      <AnimatePresence>{popupState && <Popup />}</AnimatePresence>
      <MenuItem href="/" title="Login" icon={<FaUnlock />} linkText="Login" />
      <MenuItem
        href="/contact"
        title="Contect us"
        icon={<MdOutlineMail />}
        linkText="Contact Us"
      />
      <MenuItem
        href="/about"
        title="About"
        icon={<FaInfo />}
        linkText="About"
      />
    </>
  );

  if (session.data?.user) {
    authContent = (
      <>
        <MenuItem
          href="/meds"
          title="Medications"
          icon={<FaPrescriptionBottleMedical />}
          linkText="Medications"
        />
        <MenuItem
          href="/profile"
          title="Profile"
          icon={<FaUser />}
          linkText="Profile"
        />
        <MenuItem
          href="/contact"
          title="Contect us"
          icon={<MdOutlineMail />}
          linkText="Contact Us"
        />
        <MenuItem
          href="/about"
          title="About"
          icon={<FaInfo />}
          linkText="About"
        />
        <NoteContainer initialState={session?.data.user.notificationsEnabled} />
        <MenuItem
          isButton
          title="Logout"
          btnText="Logout"
          onClick={handleLogout}
        />
      </>
    );
  }

  return <>{authContent}</>;
};

export default Menu;
