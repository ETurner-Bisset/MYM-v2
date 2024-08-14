const CustomInput = ({ label, id, inputCss, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} name={id} className={inputCss} />
    </>
  );
};
export default CustomInput;
