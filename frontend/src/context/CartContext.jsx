import {
  createContext,
  useEffect,
  useState,
} from "react";


export const CartContext = createContext(null);


function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    try {

      const storedCart =
        localStorage.getItem("lassanaFloraCart");

      return storedCart
        ? JSON.parse(storedCart)
        : [];

    } catch {

      return [];

    }

  });


  useEffect(() => {

    localStorage.setItem(
      "lassanaFloraCart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);


  const addToCart = (
    product,
    quantity = 1
  ) => {

    const requestedQuantity =
      Number(quantity);

    const stockQuantity =
      Number(product.quantity || 0);


    if (
      requestedQuantity < 1 ||
      stockQuantity <= 0
    ) {

      return false;

    }


    setCartItems((currentItems) => {

      const existingItem =
        currentItems.find(
          (item) =>
            item.id === product.id
        );


      if (existingItem) {

        return currentItems.map(
          (item) => {

            if (
              item.id !== product.id
            ) {

              return item;

            }


            const newQuantity = Math.min(
              item.cartQuantity +
                requestedQuantity,
              stockQuantity
            );


            return {
              ...item,
              cartQuantity: newQuantity,
              stockQuantity,
            };

          }
        );

      }


      const sortedImages = [
        ...(product.images || []),
      ].sort(
        (a, b) =>
          a.displayOrder -
          b.displayOrder
      );


      return [
        ...currentItems,
        {
          id: product.id,

          name: product.name,

          sku: product.sku,

          regularPrice:
            Number(product.regularPrice),

          salePrice:
            product.salePrice
              ? Number(product.salePrice)
              : null,

          imageUrl:
            sortedImages[0]?.imageUrl ||
            "/img/product/1.png",

          stockQuantity,

          cartQuantity: Math.min(
            requestedQuantity,
            stockQuantity
          ),
        },
      ];

    });


    return true;

  };


  const increaseQuantity = (id) => {

    setCartItems((currentItems) =>

      currentItems.map((item) => {

        if (item.id !== id) {

          return item;

        }


        if (
          item.cartQuantity >=
          item.stockQuantity
        ) {

          return item;

        }


        return {
          ...item,
          cartQuantity:
            item.cartQuantity + 1,
        };

      })

    );

  };


  const decreaseQuantity = (id) => {

    setCartItems((currentItems) =>

      currentItems.map((item) => {

        if (item.id !== id) {

          return item;

        }


        if (item.cartQuantity <= 1) {

          return item;

        }


        return {
          ...item,
          cartQuantity:
            item.cartQuantity - 1,
        };

      })

    );

  };


  const removeFromCart = (id) => {

    setCartItems((currentItems) =>

      currentItems.filter(
        (item) => item.id !== id
      )

    );

  };


  const clearCart = () => {

    setCartItems([]);

  };


  const cartItemCount =
    cartItems.reduce(
      (total, item) =>
        total + item.cartQuantity,
      0
    );


  const cartSubtotal =
    cartItems.reduce(
      (total, item) => {

        const price =
          item.salePrice ||
          item.regularPrice;

        return (
          total +
          price * item.cartQuantity
        );

      },
      0
    );


  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


export default CartProvider;