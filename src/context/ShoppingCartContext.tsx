import React, { ReactNode } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: number, quantity: number) => void;
  getItemQuantity: (id: number) => number;
  // increaseCartQuantity: (id: number) => void;
  // decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = React.createContext({} as ShoppingCartContextProps);

const useShoppingCart = () => {
  return React.useContext(ShoppingCartContext);
};

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [toggleCart, setCart] = React.useState<boolean>(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [tempItems, setTempItems] = React.useState<CartItem[]>([]);

  const openCart = () => setCart(true);
  const closeCart = () => setCart(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (id: number, quantity: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: quantity }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      }
    });
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  // console.log('Cart Items', cartItems);
  console.log('Temp Items', tempItems);
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        removeFromCart,
        cartItems,
        openCart,
        closeCart,
        cartQuantity,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { useShoppingCart, ShoppingCartProvider };
