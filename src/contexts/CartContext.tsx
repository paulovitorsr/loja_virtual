import { createContext, ReactNode, useState} from "react";

import { ProducProps } from "../pages/Home";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProducProps) => void;
    removeItemCart: (produtc: CartProps) => void;
    total: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
  }

  interface CartProviderProps{
    children : ReactNode
  }

  export const CartContext = createContext({} as CartContextData)

  function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProducProps){
      const indexItem = cart.findIndex(item => item.id === newItem.id)

      if(indexItem !== -1){
        const cartList = cart;

        cartList[indexItem].amount = cartList[indexItem].amount + 1;
        cartList[indexItem].amount = cartList[indexItem].amount * cartList[indexItem].price;

        setCart(cartList)
        totalResultCart(cartList);
        return;
      }

      const data = {
        ...newItem,
        amount: 1,
        total: newItem.price
      }

      setCart(produtcs => [...produtcs, data])
      totalResultCart([...cart, data])

    }

    function removeItemCart(produtc: CartProps){
      const indexItem = cart.findIndex(item => item.id === produtc.id)

      if(cart[indexItem]?.amount > 1){
        const cartList = cart;

        cartList[indexItem].amount = cartList[indexItem].amount -1;
        cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

        setCart(cartList);
        totalResultCart(cartList);
        return;
      }

      const removeItem = cart.filter(item => item.id !== produtc.id)
      setCart(removeItem);
      totalResultCart(removeItem);
      
    }

    function totalResultCart(items: CartProps[]){
      const myCart = items;
      const result = myCart.reduce((acc, obj) => { return acc + obj.total}, 0)
      const resultFormat = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
      setTotal(resultFormat);
    }

    return(
        <CartContext.Provider 
            value={{ 
              cart, 
              cartAmount: cart.length, 
              addItemCart, 
              removeItemCart, 
              total 
            }}
        >
            {children}
        </CartContext.Provider>
    )
  }

  export default CartProvider;