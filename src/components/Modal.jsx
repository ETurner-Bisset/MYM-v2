import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const Modal = ({ children, onClose }) => {
  return createPortal(
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.5 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7 }}
        exit="hidden"
        className="backdrop"
        onClick={onClose}
      ></motion.div>
      <dialog open>{children}</dialog>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
