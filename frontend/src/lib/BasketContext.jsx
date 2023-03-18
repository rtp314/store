import { createContext, useCallback, useReducer } from "react";

export const BasketContext = createContext();

const reducer = (state, action) => {
    let newState = [...state];
    const indexOfItem = state.findIndex((item) => item.id === action.item.id);

    switch (action.type) {
        case "add":
            if (indexOfItem >= 0) {
                const newQuantity = newState[indexOfItem].quantity + 1;
                newState[indexOfItem] = { ...newState[indexOfItem], quantity: newQuantity };
            } else {
                newState.push({ ...action.item, quantity: 1 });
            }
            break;

        case "remove":
            if (indexOfItem >= 0) {
                const newQuantity = newState[indexOfItem].quantity - 1;
                newState[indexOfItem] = { ...newState[indexOfItem], quantity: newQuantity };
            }
            break;

        default:
            break;
    }

    return newState.filter((item) => item.quantity > 0);
};

export default function BasketContextProvider({ children }) {
    const [basketItems, dispatch] = useReducer(reducer, []);
    const contextValue = { basketItems, dispatch };

    return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}
