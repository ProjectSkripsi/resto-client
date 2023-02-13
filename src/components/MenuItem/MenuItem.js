import React, { useContext } from 'react';
import styles from './MenuItem.module.css';
import CartContext from '../../store/cart-context';
import ItemForm from '../ItemForm/ItemForm';
import { convertToRupiah } from '../../helpers/utils';

// Displays relevant data for each MenuItem to the Menu component & updates CartContext when a valid amount is passed from ItemForm
const MenuItem = (props) => {
  const cartCtx = useContext(CartContext);

  // Updates CartContext with the amount of items the user wishes to add to cart
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.item.id,
      name: props.item.name,
      amount: amount,
      price: props.item.price
    });
  };

  // Ensure the price always diplays to 2 decimal places
  const price = `${props.item.price}`;

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.name}>
          {props.item.name} {!props?.item?.isReady && '-'}
          <span style={{ color: 'red' }}>
            {!props?.item?.isReady && ' Habis'}
          </span>
        </p>
        <p className={styles.description}>{props.item.description}</p>
        <p className={styles.price}>{convertToRupiah(price)}</p>
      </div>
      <div>
        <ItemForm
          onAddToCart={addToCartHandler}
          item={props.item}
          isReady={props?.item?.isReady}
        />
      </div>
    </div>
  );
};

export default MenuItem;
