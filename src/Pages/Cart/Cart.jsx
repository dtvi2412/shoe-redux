import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import CloseIcon from '@material-ui/icons/Close';
import './Cart.scss';
import { createAction } from '../../Redux/Action';
import {
  ITEM_DETAIL,
  REMOVE_ITEM,
  UP_AND_DOWN_CART,
} from '../../Redux/Constants';
import NotificationErr from '../../Components/NotificationErr/NotificationErr';

function Cart() {
  const cartArr = useSelector((item) => item.ShoesReducer.cart);
  //Total Cart In Redux
  const cart = useSelector((item) => item.ShoesReducer.cart);
  const userLogin = useSelector((user) => user.ShoesReducer.userLogin);
  const dispatch = useDispatch();
  //Dispatch Shoe In Store Redux
  const handleShoeDetail = (item) => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
    // setSizeShoe(false);
    dispatch(createAction(ITEM_DETAIL, item));
  };
  //Remove Item
  const handleRemoveItem = (id) => {
    dispatch(createAction(REMOVE_ITEM, id));
  };
  //Handle Up And Down Cart In Cart
  const handleUpAndDownAmountCart = (id, name) => {
    if (name === 'up') {
      dispatch(createAction(UP_AND_DOWN_CART, id, name));
    }
    if (name === 'down') {
      dispatch(createAction(UP_AND_DOWN_CART, id, name));
    }
  };
  //Render Cart
  const renderCart = () => {
    return cartArr
      ?.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <tr className="cart__items__item">
              <td data-label="Products" className="cart__items__item__product">
                <Link
                  to={`/shoe-detail/${item.id}`}
                  onClick={() => handleShoeDetail(item)}
                >
                  <div className="cart__items__item__product__image">
                    <img src={item.linkImage} alt={`cart-${item.id}`} />
                  </div>
                </Link>
                <h1>{item.name}</h1>
              </td>
              <td data-label="Color">Grey</td>
              <td data-label="Size">
                {item.sizeShoes
                  .filter((item) => item.check === true)
                  .map((sizeTrue) => {
                    return (
                      <React.Fragment key={sizeTrue.id}>
                        {sizeTrue.size}
                      </React.Fragment>
                    );
                  })}
              </td>
              <td data-label="Amount" className="cart__items__item__amount">
                <div onClick={() => handleUpAndDownAmountCart(item.id, 'down')}>
                  <NavigateBeforeIcon />
                </div>
                <span>{item?.amount}</span>
                <div onClick={() => handleUpAndDownAmountCart(item.id, 'up')}>
                  <NavigateNextIcon />
                </div>
              </td>

              <td data-label="Price">
                {item.priceDiscount === null ? (
                  <div>
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                ) : (
                  <div>
                    {item.priceDiscount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                )}
              </td>
              <td data-label="Total Price">
                {item.priceDiscount === null ? (
                  <div className="cart__items__item__totalPrice">
                    {(item.price * item.amount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                ) : (
                  <div className="cart__items__item__totalPrice">
                    {(item.priceDiscount * item.amount).toLocaleString(
                      'en-US',
                      { style: 'currency', currency: 'USD' }
                    )}
                  </div>
                )}
              </td>
              {/* <div className="cart__items__item__remove">
              <HighlightOffIcon />
            </div> */}
              <td data-label="Remove" className="cart__items__item__removeItem">
                {/* <CloseIcon /> */}
                <img
                  src="https://cdn0.iconfinder.com/data/icons/check-out-vol-1-2/48/Check_Out-13-512.png"
                  onClick={() => handleRemoveItem(item.id)}
                  alt={item.name}
                />
              </td>
            </tr>
          </React.Fragment>
        );
      })
      .reverse();
  };
  //Define History And Return Page Home If cart < 0 items
  const history = useHistory();
  const handleReturnHome = () => {
    return history.push('/');
  };
  //Handle Check Out
  const [err, setErr] = useState(false);
  const handleCheckOut = () => {
    // setErr(true);
    //Check user exist
    if (Object.keys(userLogin).length > 0) {
      alert('Filler Information and Done!!!');
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <>
      {cartArr?.length > 0 ? (
        <div className="cart">
          <div className="cart__title">
            <h1>Your Shoppping Cart</h1>
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              <button>
                <ArrowBackIcon />
                <p>Continue Shopping</p>
              </button>
            </Link>
          </div>
          <div className="cart__items">
            <table id="products">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderCart()}</tbody>
            </table>
            <div className="cart__order">
              <h1 className="cart__order__title">Order Summary</h1>
              <div className="cart__order__items">
                <h2>
                  ITEMS:{' '}
                  <span className="cart__order__items__length">
                    {/* {cartArr?.length} */}
                    {cart?.reduce((amount, item) => {
                      return item.amount + amount;
                    }, 0)}
                  </span>
                </h2>
              </div>
              <div className="cart__order__shipping">
                <h2>SHIPPING</h2>
                <select>
                  <option>Standord Delivery - $5.00</option>
                </select>
              </div>
              <div className="cart__order__promo">
                <h2>PROMO CODE</h2>
                <input placeholder="Enter your code" />
              </div>
              <button className="cart__order__apply">APPLY</button>
              <div className="cart__order__total">
                <h2>TOTAL COST</h2>
                <span>
                  {/* Calculator Cart  */}
                  {cart
                    .reduce((amount, item) => {
                      if (item.priceDiscount === null) {
                        return item.price * item.amount + amount;
                      } else {
                        return item.priceDiscount * item.amount + amount;
                      }
                    }, 0)
                    .toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                </span>
              </div>
              <button
                onClick={() => handleCheckOut()}
                className="cart__order__checkout"
              >
                CHECKOUT
              </button>
            </div>
          </div>
          {err && <NotificationErr text="You need to login before paying!" />}
        </div>
      ) : (
        <div>{handleReturnHome()}</div>
      )}
    </>
  );
}

export default Cart;
