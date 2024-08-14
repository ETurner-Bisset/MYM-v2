'use client';

const MedContentItem = ({ label, value, className, HtmlElement }) => {
  let CustomElement = 'p';

  if (HtmlElement === 'title') {
    CustomElement = 'h2';
  } else if (HtmlElement === 'time') {
    CustomElement = 'time';
  }

  return (
    <>
      <CustomElement className={className}>
        {label} <span>{value}</span>
      </CustomElement>
      <div className="line"></div>
    </>
  );
};

export default MedContentItem;
