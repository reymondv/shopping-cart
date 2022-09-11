import React from 'react';
import StoreItem from '../components/StoreItem';
import items from '../data/data.json';

const Store = () => {
  return (
    <>
      <div className='mt-10 mb-10 justify-center items-center container grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 gap-y-14'>
        {items.map((data) => (
          <div key={data.id} className='container'>
            <StoreItem {...data} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Store;
