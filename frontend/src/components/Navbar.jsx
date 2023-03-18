import React from "react";
import Basket from "./Basket";

export default function Navbar({ basketItems, setBasketItems }) {
    return (
        <nav id='navbar'>
            <div className='flex-row'>
                <span>E-Commerce</span>
                <Basket basketItems={basketItems} setBasketItems={setBasketItems} />
            </div>
        </nav>
    );
}
