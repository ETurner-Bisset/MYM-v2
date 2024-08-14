import { motion } from 'framer-motion';

import classes from './MobileMeu.module.css';
import Modal from '../Modal';
import Menu from './Menu';

const MobileMenu = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <motion.ul
        variants={{
          hidden: { x: -300 },
          visible: { x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7 }}
        exit="hidden"
        className={classes.ul}
      >
        <Menu />
      </motion.ul>
    </Modal>
  );
};
export default MobileMenu;
