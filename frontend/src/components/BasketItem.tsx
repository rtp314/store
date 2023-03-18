import React from 'react';
import { BasketDispatch, ItemWithQuantity } from '../lib/BasketContext';

type BasketItemProps = {
  item: ItemWithQuantity;
  dispatch: BasketDispatch;
};

export default function BasketItem({ item, dispatch }: BasketItemProps) {
  function removeItem(e: React.MouseEvent) {
    e.preventDefault();
    dispatch({ type: 'remove', item });
  }

  return (
    <>
      {item.imgSrc ? (
        <img className="item-image" src={item.imgSrc} />
      ) : (
        <div className="basket-image" style={{ background: item.imgColor }}>
          No Image
        </div>
      )}
      <span className="basket-name">{item.name}</span>
      <span className="basket-quantity">{item.quantity}</span>
      <span className="basket-price">${(item.quantity * item.priceInCents) / 100}</span>
      <span className="basket-remove" onClick={removeItem}>
        X
      </span>
    </>
  );
}
