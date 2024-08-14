'use client';

const ToggleBtn = ({ isEnabled }) => {
  const handleToggleSwitch = () => {};
  return (
    <>
      <div className="toggle-button-cover">
        <div className="button r" id="button-3">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={isEnabled}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};
export default ToggleBtn;
