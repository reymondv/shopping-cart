import React from 'react';
import StoreItem from '../components/StoreItem';
import items from '../data/data.json';

type Props = {};

const Store = (props: Props) => {
  return (
    <>
      <div className='mt-10 mb-10 container grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1'>
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
