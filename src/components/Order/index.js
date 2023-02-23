import React, { useEffect, useState } from 'react';
import styles from '../ContentBody/ContentBody.module.css';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import OrderItem from './OrderItem';
import Card from '../UI/Card/Card';
import { QRCode } from 'react-qrcode-logo';

const OrderPage = () => {
  let params = useParams();
  const [data, seData] = useState({});
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await fetch(
        `https://resto-app-bz58.onrender.com/api/order/${params.id}`
      );
      const data = await resp.json();
      seData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById('qr-gen');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${data?.invoiceId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const { itemMenus } = data;
  const isDone = itemMenus && itemMenus.filter((o) => o.status !== 'done');

  return (
    <div className={styles.content}>
      <Header isOrder />
      <Card className={styles.menu}>
        <div
          style={{
            padding: '0px 20px 15px 20px '
          }}
        >
          <div>
            <p
              style={{
                fontSize: '25px'
              }}
            >
              Detail Pelanggan
            </p>
          </div>
          <table>
            <tr>
              <td style={{ paddingRight: '35px' }}>Meja</td>
              <td>: {data?.tableId}</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '35px' }}>Invoice</td>
              <td>: {data?.invoiceId}</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '35px' }}>Nama</td>
              <td>: {data?.name}</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '35px' }}>No. Hp</td>
              <td>: {data?.contact}</td>
            </tr>
            <tr>
              <td style={{ paddingRight: '35px' }}>Email</td>
              <td>: {data?.email}</td>
            </tr>
          </table>
        </div>
        {itemMenus &&
          itemMenus.map((item) => <OrderItem key={item?._id} item={item} />)}
        <div
          style={{
            marginTop: '25px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <QRCode
            id="qr-gen"
            value={`https://bebek-goyang.surge.sh/order/${params.id}`}
            // qrStyle="dots"
            // logoImage="https://paperless-menu.surge.sh/assets/logos/begos.png"
            // logoWidth="120"
            ecLevel="H"
          />
        </div>
        <p
          onClick={downloadQRCode}
          style={{
            textAlign: 'center',
            fontSize: '12px',
            cursor: 'pointer',
            color: 'blue'
          }}
        >
          Download QR
        </p>
        <div
          style={{
            marginTop: '25px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <p style={{ textAlign: 'center', fontSize: '12px' }}>
            Anda dapat menutup aplikasi, silakan download qrcode transaksi anda
            untuk melihat update status penyajian menu pesanan anda
          </p>
        </div>
        {isDone && isDone.length !== 0 && (
          <div
            onClick={() => getData()}
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
            <p style={{ textAlign: 'center', color: 'white' }}>Refresh</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OrderPage;
