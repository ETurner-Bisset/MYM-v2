'use client';

import { Oval } from 'react-loader-spinner';

const LoadingSpinner = ({ height, width, color }) => {
  return (
    <Oval
      height={height}
      width={width}
      color={color}
      ariaLabel="oval-loading"
      visible={true}
      wrapperStyle={{ margin: 'auto' }}
    />
  );
};

export default LoadingSpinner;
