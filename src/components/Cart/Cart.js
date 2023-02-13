import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import CartItem from '../CartItem/CartItem';
import Checkout from '../Checkout/Checkout';
import { convertToRupiah } from '../../helpers/utils';

// Displays all CartItems to the user - updates CartContext when item amounts are changed from CartItem
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [customerData, setCustomerData] = useState({});

  // Remove selected item from CartContext
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Add item to CartContext
  const addItemHandler = (item) => {
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price
    });
  };

  // Reset CartContext
  const emptyCartHandler = () => {
    cartCtx.emptyCart();
  };

  // Show Checkout form
  const orderButtonHandler = () => {
    setCheckout(true);
  };

  // Close Checkout form
  const closeOrderHandler = () => {
    setCheckout(false);
  };

  // Called when user closes their order confirmation message, clears cart
  const closeOrderDetailsHandler = () => {
    emptyCartHandler();
    props.onCloseCart();
  };

  // Submit order to database when user confirms their order
  const submitOrderHandler = async (userData) => {
    const { items } = cartCtx;
    const menu = items.map((item) => ({
      menu: item?.id,
      quantity: item?.amount
    }));
    userData.itemOrder = menu;

    // setIsSubmitting(true);
    // setCustomerData(userData);
    // try {
    //   await fetch(
    //     'https://order-food-9b59a-default-rtdb.firebaseio.com/orders.json',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         user: userData,
    //         orderedItems: cartCtx.items,
    //         totalAmount: totalAmount
    //       })
    //     }
    //   );
    // } catch (error) {
    //   console.error(error.message);
    // }

    // setIsSubmitting(false);
    // setDidSubmit(true);
  };

  // Ensure the price always diplays to 2 decimal places
  const totalAmount = `${convertToRupiah(cartCtx.totalAmount)}`;

  // Only show order button if Cart contains CartItems
  const hasItems = cartCtx.items.length > 0;

  // Content to return before an order is sumbitted
  const cartContent = (
    <React.Fragment>
      <div className={styles.items}>
        {!hasItems && (
          <p className={styles.empty}>Tidak ada barang di keranjang Anda!</p>
        )}
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          />
        ))}
      </div>

      <div className={styles.amount}>
        <h2>Jumlah Total</h2>
        <h2>{totalAmount}</h2>
      </div>
      <div>
        {checkout && (
          <Checkout
            onConfirmOrder={submitOrderHandler}
            onCloseOrder={closeOrderHandler}
          />
        )}
      </div>
      {!checkout && (
        <div className={styles.controls}>
          <div>
            {hasItems && (
              <Button onClick={emptyCartHandler} className={styles.alt}>
                Empty Cart
              </Button>
            )}
          </div>
          <div className={styles.order}>
            <Button onClick={props.onCloseCart} className={styles.alt}>
              Tutup
            </Button>
            {hasItems && <Button onClick={orderButtonHandler}>Order</Button>}
          </div>
        </div>
      )}
    </React.Fragment>
  );

  // Content to return while order is submtting
  const isSubmittingContent = <p>Your order is processing</p>;

  // Content to return after order has submitted
  const didSubmitContent = (
    <React.Fragment>
      <div className={styles.delivery}>
        <h2>Pesanan anda telah kami terima</h2>
        <p>
          Terima kasih atas pesanan Anda! Pesanan Anda akan kami siapkan
          secepatnya.
        </p>

        <h3>Detail Pelanggan</h3>
        <p> Meja: {customerData.address}</p>
        <p>{customerData.name}</p>
        <p>
          {customerData.phone} / {customerData.email}
        </p>

        <h3>Detail Pesanan</h3>
        {cartCtx.items.map((item) => (
          <p key={item.id}>
            {item.name} x {item.amount}
          </p>
        ))}

        <h3>Total</h3>
        <p>{totalAmount}</p>
      </div>

      <div className={styles.order}>
        <Button onClick={closeOrderDetailsHandler} className={styles.alt}>
          Tutup
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal className={styles.cart}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
