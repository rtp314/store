import React, { useContext } from 'react';
import { useBasket } from '../lib/BasketContext';
import { Item } from '../lib/ItemContext';
import type { Item as ItemType } from '../lib/ItemContext';

type ItemProps = {
  item: ItemType;
};

export default function Item({ item }: ItemProps) {
  const { dispatch } = useBasket();

  return (
    <div className="item">
      {item.imgSrc ? (
        <img className="item-image" src={item.imgSrc} />
      ) : (
        <div className="item-image" style={{ background: item.imgColor }}>
          No Image
        </div>
      )}
      <div className="item-description flex-column">
        <span className="item-name">{item.name}</span>
        <div className="flex-row">
          <span className="item-price">${item.priceInCents / 100}</span>
          <button onClick={() => dispatch({ type: 'add', item })} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
