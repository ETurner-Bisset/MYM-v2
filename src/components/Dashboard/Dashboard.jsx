'use client';

import { IoMdMenu } from 'react-icons/io';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import NavLink from '../NavLink';
import Button from '../UI/Button';
import classes from './Dashboard.module.css';
import MobileMenu from './MobileMenu';
import DashboardMenu from './DashboardMenu';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={classes.header}>
        <Button title="Menu" onClick={toggleMenu}>
          <IoMdMenu />
        </Button>
        <NavLink href="/" title="Home">
          Manage Your Meds
        </NavLink>
      </header>
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={closeMenu} />}
      </AnimatePresence>
      <DashboardMenu />
    </>
  );
};
export default Dashboard;
