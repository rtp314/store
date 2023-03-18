import { useEffect, useState } from 'react';

//try replacing ItemContext with this function, allows two-way data flow
//use observer pattern, take all setState functions from components and update them when central information changes.

let storeItems = [];
let loading = true;
let observerUpdateFunctions = [];
fetch('url')
  .then(res => res.json())
  .then(fetchedItems => (storeItems = fetchedItems))
  .catch(err => console.log(err))
  .finally(() => (loading = false));

//use this for any functions which need to update items
export const setStoreItems = newItems => {
  storeItems = newItems;
  observerUpdateFunctions.forEach(fn => fn(newItems));
};

//use this for any functions which need to use items
export function useItems() {
  const [isLoading, setIsLoading] = useState(loading);
  const [items, setItems] = useState(storeItems);

  useEffect(() => {
    observerUpdateFunctions.push(setItems);
    return () => (observerUpdateFunctions = observerUpdateFunctions.filter(fn => fn != setItems));
  }, []);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return { isLoading, items };
}
