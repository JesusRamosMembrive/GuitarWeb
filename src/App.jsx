import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

    const initialCart = ()=> JSON.parse(localStorage.getItem("cart")) || []

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])


    function addToCart(item){
        
        const itemExists = cart.findIndex(product=>product.id===item.id)

        if(itemExists >=0)
        {
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        }
        else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeCart(id){
        const updateCart = cart.filter(product=>product.id !== id)
        setCart(updateCart)
    }

    function descreaseQuantity(id){
        console.log("Descrease Quantity")
        const itemExists = cart.findIndex(product=>product.id===id)

        if(cart[itemExists].quantity > 1){
            const updateCart = [...cart]
            updateCart[itemExists].quantity--
            setCart(updateCart)
        }
        else{
            removeCart(id)
        }
    }

    function increaseQuantity(id){
        console.log("Increase Quantity")
        const itemExists = cart.findIndex(product=>product.id===id)

        const updateCart = [...cart]
        updateCart[itemExists].quantity++
        setCart(updateCart)
    }

    function clearCart(e){
        setCart([])
    }

    function getLocalStorage(){
        if(localStorage.getItem("cart") === null){
            localStorage.setItem("cart", JSON.stringify([]))
        }
        else{
            setCart(JSON.parse(localStorage.getItem("cart")))
        }
    }

    return (
    <>
    <Header
        cart={cart}
        removeCart={removeCart}
        descreaseQuantity={descreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">
            {data.map((guitar)=>(
                <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                    increaseQuantity={increaseQuantity}
                />
            ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
