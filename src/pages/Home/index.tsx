import {useEffect, useState, useContext} from "react";
import {BsCartPlus} from "react-icons/bs";
import {Link} from "react-router-dom";

import { api } from "../../Service/api";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export interface ProducProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}


export const Home = () => {
  const {addItemCart} = useContext(CartContext)
  const [products, setProducts] = useState<ProducProps[]>([])

  useEffect( () => {
    async function getProducts() {
      const response = await api.get("/products")
      setProducts(response.data)
    }

    getProducts()
  }, [] )

  function handleAddCartItem(product: ProducProps){
    toast.success("Produto adicionado no carrinho.")
    addItemCart(product);
  }

    return (
      <div className="">
        <main className="w-full max-w-7x1 px-4 mx-auto ">
          <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produto em alta</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {products.map( (product) => (
              <section key={product.id} className="w-full">
                <Link to={`/products/${product.id}`}>
                  <img 
                    className="w-full rounded-lg max-h-70 mb-2"
                    src={product.cover} alt={product.title}
                  />
                </Link>
                <p className="flex gap-3 items-center">{product.title}</p>

                <div>
                  <strong className="text-zinc-900 p-1 rounded">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </strong>
                  <button className="bg-black rounded p-1" onClick={ () => handleAddCartItem(product) }>
                    <BsCartPlus size={20} color="#fff"/>
                  </button>
                </div>
              </section>
            ) )}
          </div>
        </main>
      </div>
    )
  }
  