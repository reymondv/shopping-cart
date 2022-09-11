import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import formatCurrency from '../utilities/formatCurrency';

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const { getItemQuantity, addToCart, removeFromCart } = useShoppingCart();

  // const quantity = getItemQuantity(id);

  const [isAddToCartClicked, setAddToCardClicked] =
    React.useState<boolean>(false);
  const [itemCount, setItemCount] = React.useState<number>(0);

  const incItemCount = () => {
    itemCount >= 0 && setItemCount((current) => current + 1);
  };

  const decItemCount = () => {
    itemCount > 0 && setItemCount((current) => current - 1);
  };

  const handleCartClick = () => {
    if (itemCount > 0) {
      setAddToCardClicked(!isAddToCartClicked);
      // setItemCount((current) => (current = 0));
    } else {
      setAddToCardClicked(!isAddToCartClicked);
      setItemCount((current) => current + 1);
    }
  };

  return (
    <div className='mx-auto w-[70%] sm:w-[80%] md:w-full lg:w-full rounded-lg bg-gray-100 border-solid border-black border border-opacity-20 px-4 py-4 shadow-md'>
      <img src={imgUrl} alt={name} className='object-cover' />
      <div className='flex flex-col'>
        <div className='container flex justify-between content-between pt-4 mb-4'>
          <span className='text-xl font-medium pl-4'>{name}</span>
          <span className='text-md text-gray-700 ml-2 pr-4'>
            {formatCurrency(price)}
          </span>
        </div>
        <hr />
        <div className='mx-auto container'>
          {itemCount > 0 && !isAddToCartClicked ? (
            <button
              onClick={() => {
                removeFromCart(id);
                setAddToCardClicked(false);
                setItemCount((current) => (current = 0));
              }}
              className='w-full py-2 mt-3 bg-red-500 rounded-md text-white font-bold'>
              Remove from cart &#x5b;{getItemQuantity(id)}&#x5d;
            </button>
          ) : !isAddToCartClicked && itemCount === 0 ? (
            <button
              onClick={handleCartClick}
              className='w-full py-2 mt-3 bg-blue-500 rounded-md text-white font-bold'>
              Add to cart
            </button>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-between items-center'>
                <button
                  onClick={decItemCount}
                  className='shadow-md w-10 py-2 mt-3 bg-red-500 rounded-md text-white font-bold'>
                  -
                </button>
                <input
                  type='number'
                  min='0'
                  className='border border-black w-10 h-10 mt-3 text-center border-opacity-10 shadow-sm mx-2 rounded-sm'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setItemCount(Number(e.target.value))
                  }
                  value={itemCount}
                />
                <button
                  onClick={incItemCount}
                  className='shadow-md w-10 py-2 mt-3 bg-blue-500 rounded-md text-white font-bold'>
                  +
                </button>
              </div>
              <div className='mt-6 flex justify-between items-center container'>
                <button
                  className='text-gray-500 font-semibold px-2 py-1 bg-gray-300 rounded-xl w-20 hover:shadow-md hover:bg-gray-400 ml-4'
                  onClick={() => {
                    removeFromCart(id);
                    setAddToCardClicked(!isAddToCartClicked);
                    setItemCount((current) => (current = 0));
                  }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    addToCart(id, itemCount);
                    setAddToCardClicked(false);
                  }}
                  className='bg-blue-500 font-semibold px-2 py-1 text-white rounded-xl w-20 hover:shadow-md hover:bg-blue-900 mr-4'>
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
