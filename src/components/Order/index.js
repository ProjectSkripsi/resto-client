import React, { useEffect, useState } from 'react';
import styles from '../ContentBody/ContentBody.module.css';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import OrderItem from './OrderItem';
import Card from '../UI/Card/Card';

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
        {isDone.length !== 0 && (
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
