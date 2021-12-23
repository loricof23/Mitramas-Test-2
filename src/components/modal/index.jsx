import React from 'react';

import './modal.css';

const Index = ({
  children,
  onClick,
  show,
  title,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className='fixed bg-black/80 flex justify-center items-center top-0 w-full h-full'>
      <div className='bg-white p-4 rounded-sm min-w-[60%]'>
        <div className='pb-4 border-b mb-4 flex justify-between'>
          <div>{title}</div>
          <button onClick={onClick}>Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Index.defaultProps = {
  show: false,
  title: '',
}

export default Index;