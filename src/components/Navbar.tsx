/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { motion } from 'framer-motion';
import items from '../data/data.json';
import formatCurrency from '../utilities/formatCurrency';

const Navbar = () => {
  const [isOption, setOption] = useState<boolean>(false);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);

  const toggleOption = () => {
    setOption(!isOption);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };
  const { openCart, cartQuantity, cartItems } = useShoppingCart();
  return (
    <>
      <nav className='bg-gray-800 fixed w-full'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
                <svg
                  className='hidden h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <Link to='/'>
                  <img
                    className='block h-8 w-auto lg:hidden'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='Shopping Cart'
                  />
                </Link>
                <Link to='/'>
                  <img
                    className='hidden h-8 w-auto lg:block'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='Shopping Cart'
                  />
                </Link>
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  <NavLink
                    to='/'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    Home
                  </NavLink>

                  <NavLink
                    to='/store'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    Store
                  </NavLink>

                  <NavLink
                    to='/about'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    About
                  </NavLink>
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div className='relative ml-3'>
                <button
                  onClick={toggleCart}
                  type='button'
                  className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white text-2xl'>
                  <span className='sr-only'>Cart</span>
                  <FaShoppingCart />
                  <div className='rounded-full bg-red-600 flex justify-center items-center text-sm text-white absolute bottom-0 right-[-5px] w-4 h-4'>
                    {cartQuantity}
                  </div>
                </button>
                {isCartOpen && (
                  <motion.aside
                    className='fixed right-0 z-10 mt-[0.95rem] w-[30%] h-[100vh] origin-top-right bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none shadow-xl '
                    role='menu'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                    initial={{ width: 0 }}
                    animate={{ width: 500 }}>
                    <div>
                      {cartItems.map((data, idx) => (
                        <div className='container pt-5 px-5 flex flex-row'>
                          <img
                            className='w-20 rounded-md'
                            src={items[data.id - 1].imgUrl}
                            alt={items[data.id - 1].name}
                          />
                          <div className='flex justify-between container'>
                            <div className='flex flex-col ml-5 justify-center'>
                              <span className='text-lg'>
                                {items[data.id - 1].name}
                              </span>
                              <span className='text-md'>{data.quantity}x</span>
                            </div>
                            <div className='flex justify-center flex-col mx-5'>
                              <span className='text-lg font-semibold'>
                                {formatCurrency(
                                  items[data.id - 1].price * data.quantity
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.aside>
                )}
              </div>
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    onClick={toggleOption}
                    className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>
                {isOption && (
                  <div
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-0'>
                      Your Profile
                    </a>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-1'>
                      Settings
                    </a>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'>
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='sm:hidden' id='mobile-menu'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            <NavLink
              to='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
              Home
            </NavLink>

            <NavLink
              to='/store'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
              Store
            </NavLink>

            <NavLink
              to='/about'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
