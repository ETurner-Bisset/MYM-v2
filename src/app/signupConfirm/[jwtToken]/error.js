'use client';

const ActivationErrorPage = ({ error }) => {
  console.log(error);
  return <div>{error.message}</div>;
};

export default ActivationErrorPage;
