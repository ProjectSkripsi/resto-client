import React, { useState, useContext } from 'react';
import styles from './ContentBody.module.css';
import CartProvider from '../../store/CartProvider';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import CartContext from '../../store/cart-context';
import Barcode from '../BarcodeScanner';

// Displays Cart, Header, Banner & Menu to the user - provides CartProvider conext to all children - passes closeCartHandler to Cart & viewCartHandler to Header
const ContentBody = (props) => {
  const cartCtx = useContext(CartContext);
  const [viewCart, setViewCart] = useState(false);
  const [scan, setScan] = useState(false);

  const viewCartHandler = () => {
    setViewCart(true);
  };

  const closeCartHandler = () => {
    setViewCart(false);
  };

  return (
    <div className={styles.content}>
      <CartProvider>
        {viewCart && (
          <Cart onCloseCart={closeCartHandler} onOpenCart={viewCartHandler} />
        )}
        <Header onViewCart={viewCartHandler} scan={scan} />
        {!scan && <Banner />}
        {scan && <Barcode setScan={setScan} />}

        <div
          onClick={() => setScan(!scan)}
          style={{
            marginTop: '25px',
            width: '100%',
            padding: '1px 0px 1px 0px',
            outline: 'solid 1px green',
            backgroundColor: 'green',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <p style={{ textAlign: 'center', color: 'white' }}>
            {scan ? 'Tutup' : 'Scan Menu'}
          </p>
        </div>
        {/* <Menu /> */}
      </CartProvider>
    </div>
  );
};

export default ContentBody;
