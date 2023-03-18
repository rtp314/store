import React, { useContext } from "react";
import { ItemContext } from "../lib/ItemContext";
import Spinner from "./Spinner";
import Item from "./Item";

export default function Catalog() {
    const store = useContext(ItemContext);
    return (
        <div id='catalog'>
            {store.loading ? <Spinner /> : store.items.map((item) => <Item key={item.id} item={item} />)}
        </div>
    );
}
