'use client';
import { useFormStatus } from 'react-dom';
import { Oval } from 'react-loader-spinner';

import Button from '@/components/UI/Button';

const SubmitBtn = ({ children, title, className }) => {
  const { pending } = useFormStatus();
  // const pending = true;

  return (
    <>
      {pending ? (
        <Oval
          width="40"
          height="40"
          color="#1e2dfc"
          ariaLabel="oval-loading"
          visible={true}
          wrapperStyle={{ padding: '0.3rem' }}
        />
      ) : (
        <Button type="submit" title={title} className={className}>
          {children}
        </Button>
      )}
    </>
  );
};

export default SubmitBtn;
