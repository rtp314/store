import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import ItemContextProvider from "./lib/ItemContext";
import BasketContextProvider from "./lib/BasketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ItemContextProvider>
            <BasketContextProvider>
                <App />
            </BasketContextProvider>
        </ItemContextProvider>
    </React.StrictMode>
);
