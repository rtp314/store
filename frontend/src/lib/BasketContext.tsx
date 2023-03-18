import { createContext, useContext, useReducer } from 'react';
import type { Item } from './ItemContext';

export const BasketContext = createContext<{
  basketItems: ItemWithQuantity[];
  dispatch: BasketDispatch;
} | null>(null);

export type ItemWithQuantity = Item & {
  quantity: number;
};

export type ItemReducerAction = {
  item: Item;
  type: 'add' | 'remove';
};

export type BasketDispatch = React.Dispatch<ItemReducerAction>;

const reducer = (state: ItemWithQuantity[], action: ItemReducerAction) => {
  let newState = [...state];
  const indexOfItem = state.findIndex(item => item.id === action.item.id);

  switch (action.type) {
    case 'add':
      if (indexOfItem >= 0) {
        const newQuantity = newState[indexOfItem].quantity + 1;
        newState[indexOfItem] = { ...newState[indexOfItem], quantity: newQuantity };
      } else {
        newState.push({ ...action.item, quantity: 1 });
      }
      break;

    case 'remove':
      if (indexOfItem >= 0) {
        const newQuantity = newState[indexOfItem].quantity - 1;
        newState[indexOfItem] = { ...newState[indexOfItem], quantity: newQuantity };
      }
      break;

    default:
      break;
  }

  return newState.filter(item => item.quantity > 0);
};

export default function BasketContextProvider({ children }: React.PropsWithChildren) {
  const [basketItems, dispatch] = useReducer(reducer, []);
  const contextValue = { basketItems, dispatch };

  return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}

export function useBasket() {
  const contextValue = useContext(BasketContext);
  if (contextValue === null) throw new Error('Basket Context cannot be used outside context provider');
  return contextValue;
}
