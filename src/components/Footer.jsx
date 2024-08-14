const date = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <p>
        ETB ©️ Copyright <span>{date}</span>
      </p>
    </footer>
  );
};

export default Footer;
