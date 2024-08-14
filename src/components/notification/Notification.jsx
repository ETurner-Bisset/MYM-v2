import { motion } from 'framer-motion';

import Modal from '../Modal';

const Notification = ({ title, text, actionBtns, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <motion.div
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="notification"
      >
        <h2>{title}</h2>
        <p>{text}</p>
        {actionBtns}
      </motion.div>
    </Modal>
  );
};
export default Notification;
