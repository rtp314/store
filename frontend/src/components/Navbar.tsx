import React from "react";
import Basket from "./Basket";

export default function Navbar() {
    return (
        <nav id='navbar'>
            <div className='flex-row'>
                <span>E-Commerce</span>
                <Basket />
            </div>
        </nav>
    );
}
