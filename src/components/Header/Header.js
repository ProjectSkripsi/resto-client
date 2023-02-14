import React from 'react';
import styles from './Header.module.css';
import CartButton from '../CartButton/CartButton';
import mealPhoto from '../../assets/meals.jpg';

// Displays page title, header image & CartButton to the user - passes onViewCart prop to the CartButton
const Header = (props) => {
  const { isOrder } = props;
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h4>Bebek Goyang Sulawesi</h4>
        {!isOrder && <CartButton onViewCart={props.onViewCart} />}
      </header>
      {!isOrder && (
        <div className={styles.image}>
          <img src={mealPhoto} alt="Delicious Food!"></img>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
