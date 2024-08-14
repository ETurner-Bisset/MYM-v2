const Textarea = ({ label, id, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={id} {...props}></textarea>
    </>
  );
};
export default Textarea;
