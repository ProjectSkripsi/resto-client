import styles from './Checkout.module.css';
import Button from '../UI/Button/Button';
import useInput from '../../hooks/use-input';

const Checkout = (props) => {
  // Utilize custom hook for all input fields
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetHandler: nameResetHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailResetHandler
  } = useInput((value) =>
    value.trim().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i)
  );

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    resetHandler: phoneResetHandler
  } = useInput((value) => value.trim().length > 9);

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    resetHandler: addressResetHandler
  } = useInput((value) => value.trim() !== '');

  // Form is valid only if all inputs are valid
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredAddressIsValid
  ) {
    formIsValid = true;
  }

  // If user confirms their order
  const submitOrderHandler = (event) => {
    event.preventDefault();

    // Stop form from submitting if form is not valid
    if (!formIsValid) {
      return;
    }

    const userDetails = {
      name: enteredName,
      email: enteredEmail,
      contact: enteredPhone,
      tableId: enteredAddress
    };

    props.onConfirmOrder(userDetails);
  };

  const resetFormHandler = () => {
    nameResetHandler();
    emailResetHandler();
    phoneResetHandler();
    addressResetHandler();
  };

  // If user chooses to go back instead of confirming their order
  const cancelOrderHandler = () => {
    props.onCloseOrder();
  };

  // Conditional formatting for inputs with errors
  const nameClasses = nameHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const emailClasses = emailHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const phoneClasses = phoneHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  const addressClasses = addressHasError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  return (
    <form onSubmit={submitOrderHandler}>
      <div className={styles.checkout}>
        <div className={addressClasses}>
          <label htmlFor="address">No. Meja</label>
          <input
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
            type="text"
            id="table"
          />
          {addressHasError && (
            <p className={styles.error}>No Meja tidak boleh kosong</p>
          )}
        </div>
        <div className={nameClasses}>
          <label htmlFor="name">Nama</label>
          <input
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            type="text"
            id="name"
          />
          {nameHasError && (
            <p className={styles.error}>Nama tidak boleh kosong</p>
          )}
        </div>
        <div className={emailClasses}>
          <label htmlFor="city">Email</label>
          <input
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            type="email"
            id="email"
          />
          {emailHasError && <p className={styles.error}>Masukkan email valid</p>}
        </div>
        <div className={phoneClasses}>
          <label htmlFor="phone">No. Handphone/WA</label>
          <input
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            value={enteredPhone}
            type="text"
            id="phone"
          />
          {phoneHasError && <p className={styles.error}>No. HP wajib di isi</p>}
        </div>

        <div className={styles.actions}>
          <Button
            className={styles.alt}
            onClick={cancelOrderHandler}
            type="button"
          >
            Batal
          </Button>
          <Button className={styles.alt} onClick={resetFormHandler} type="button">
            Reset Form
          </Button>
          <Button disabled={!formIsValid} type="submit">
            Konfirmasi Pesanan
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
