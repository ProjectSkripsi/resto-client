import React, { useContext } from 'react';
import styles from './MenuItem.module.css';
import CartContext from '../../store/cart-context';
import ItemForm from '../ItemForm/ItemForm';
import { convertToRupiah } from '../../helpers/utils';

// Displays relevant data for each MenuItem to the Menu component & updates CartContext when a valid amount is passed from ItemForm
const OrderItem = (props) => {
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
  const price = `${props.item.menu.price}`;

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.name}>{props.item.menu.name}</p>
        <p className={styles.description}>{props.item.quantity} Pcs</p>
        {/* <p className={styles.price}>{convertToRupiah(price)}</p> */}
      </div>
      <div>
        <p
          style={{
            fontSize: '12px',
            color:
              props.item.status === 'cook'
                ? 'red'
                : props.item.status === 'waiting'
                ? 'orange'
                : 'green'
          }}
        >
          {props.item.status === 'cook'
            ? 'Proses Penyajian'
            : props.item.status === 'waiting'
            ? 'Order Menunggu'
            : 'Telah disajikan'}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
