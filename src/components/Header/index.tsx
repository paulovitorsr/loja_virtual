import {useContext} from "react";
import { Link } from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi"

import { CartContext } from "../../contexts/CartContext";

export const Header = () => {
  const {cartAmount} = useContext(CartContext)

    return (
      <header className="w-full px-1 bg-slate-200">
        <nav className="w-full max-w-7x1 h-14 flex items-center justify-between px-5 mx-auto">
          <Link to="/" className="font-bold text-2x1">
            Dev Shop
          </Link>

          <Link to="/cart" className="relative">
            <FiShoppingCart size={24} color="#121212" />
            {cartAmount > 0 && (
              <span className="absolute px-2.5 -right-3 -top-3 bg-sky-500 rounded-full w-6 h-6 items-center flex justify-center text-white text-xs">
                {cartAmount}
              </span>
            )}
          </Link>
          
        </nav>
      </header>
    )
  }
  