import { MdOutlineMail } from 'react-icons/md';

import MainHeader from '@/components/MainHeader/MainHeader';
import ContactForm from '@/components/Forms/ContactForm';

const ContactPage = () => {
  return (
    <main>
      <MainHeader title="Contact Us" icon={<MdOutlineMail />} />
      <p>
        If you have any questions or feedback, please send us a message using
        the form below.
      </p>
      <ContactForm />
    </main>
  );
};

export default ContactPage;
