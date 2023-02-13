import React, { useState, useRef } from 'react';
import styles from './ItemForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import CartIcon from '../CartIcon/CartIcon';

// Allows the user to select a valid amount of a MenuItem - the enteredAmountNumber is passed to MenuItem before updating the Cart
const ItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  // Monitor value of input field
  const amountInputRef = useRef();

  const addItemHandler = (event) => {
    event.preventDefault();

    // Grab current value of imput field & convert string to number
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // Detect invalid input & display error message
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  const errorMessageHandler = () => {
    setAmountIsValid(true);
  };

  return (
    <form className={styles.form} onSubmit={addItemHandler}>
      <div>
        <Input
          ref={amountInputRef}
          label="Jumlah"
          input={{
            id: 'amount ' + props.item.id,
            type: 'number',
            min: '0',
            step: '1'
          }}
        />
      </div>
      <Button disabled={!props.isReady} type="submit">
        +
      </Button>
      {!amountIsValid && (
        <ErrorMessage
          onClick={errorMessageHandler}
          message={'Silahkan masukkan jumlah orderan'}
        />
      )}
    </form>
  );
};

export default ItemForm;
