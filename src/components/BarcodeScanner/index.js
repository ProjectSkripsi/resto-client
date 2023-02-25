import React, { useContext } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import CartContext from '../../store/cart-context';
import Swal from 'sweetalert2';

const Barcode = ({ setScan }) => {
  const cartCtx = useContext(CartContext);

  const onScan = async (res) => {
    if (res) {
      const data = JSON.parse(res?.text);

      const resp = await fetch(
        `https://resto-app-bz58.onrender.com/api/menu/${data?.id}`
      );
      const resCheck = await resp.json();
      if (resCheck?.data?.isReady) {
        cartCtx.addItem(data);
        setScan(false);
        Swal.fire({
          text: `${data?.name} ditambahakan ke keranjang`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Scan Menu Lain?'
        }).then((result) => {
          if (!result.isConfirmed) {
            setScan(false);
          } else {
            setScan(true);
          }
        });
      } else {
        setScan(false);

        Swal.fire({
          text: `${resCheck?.data?.name} Sold Out, Silahakan scan menu yang lain`,
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Scan Menu Lain?'
        }).then((result) => {
          if (!result.isConfirmed) {
            setScan(false);
          } else {
            setScan(true);
          }
        });
      }
    }
  };

  return (
    <BarcodeScannerComponent
      onUpdate={(err, result) => {
        onScan(result);
      }}
    />
  );
};

export default Barcode;
