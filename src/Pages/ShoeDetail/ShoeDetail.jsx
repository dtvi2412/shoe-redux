import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAction } from '../../Redux/Action';
import StorefrontIcon from '@material-ui/icons/Storefront';
import './ShoeDetail.scss';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ADD_TO_CART, ITEM_DETAIL } from '../../Redux/Constants';
// import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Notification from '../../Components/Notification/Notification';
import NotificationErr from '../../Components/NotificationErr/NotificationErr';
// import StorefrontIcon from '@material-ui/icons/Storefront';

import { SRLWrapper } from 'simple-react-lightbox';

const options = {
  caption: {
    // captionColor: '#101110',
    captionFontFamily: 'Raleway, sans-serif',
    captionFontWeight: '300',
    captionTextTransform: 'uppercase',
  },
};

function ShoeDetail(props) {
  const shoeDetail = useSelector((item) => item.ShoesReducer.shoe);
  const player = useSelector((state) => state.ShoesReducer.player);
  const shoeDetailRedux = useSelector((state) => state.ShoesReducer.shoeDetail);
  const idParams = props.match.params.id;
  //Choose Size Shoe
  const [sizeShoe, setSizeShoe] = useState(false);
  const [changeSize, setChangeSize] = useState(false);
  //Notification Error
  const [err, setErr] = useState(false);
  //Notification
  const [popupSuccess, setPopupSuccess] = useState(false);
  const dispatch = useDispatch();
  //Amount State
  const [amount, setAmount] = useState(1);
  //Handle Up and Down Amount
  const handleUpAndDownAmount = (check) => {
    if (check === 'plus' && amount < 6) {
      setAmount(amount + 1);
    }
    if (check === 'minus' && amount > 1) {
      setAmount(amount - 1);
    }
  };
  useEffect(() => {
    if (amount === 6) {
      setTimeout(() => {
        setAmount(5);
      }, 2000);
    }
  }, [amount]);
  //Dispatch Shoe In Store Redux
  const handleShoeDetail = (item) => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
    setSizeShoe(false);
    setAmount(1);
    dispatch(createAction(ITEM_DETAIL, item));
  };
  //Render Player
  const renderPlayer = () => {
    return player.map((item) => {
      return (
        <div key={item.id} className="shoe__items__player">
          <div className="shoe__items__player__image">
            <Link
              to={`/${item.idType}`}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: `smooth`,
                })
              }
            >
              <img src={item.linkImage} alt={`player-${item.idType}`} />
            </Link>
          </div>
        </div>
      );
    });
  };

  //Handle Add To Cart
  const handleAddToCart = (item) => {
    if (sizeShoe === false) {
      // alert('CHOOSE SIZE BRO!!');
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    } else {
      // If Choose Size We add to cart and Alert Custumer
      dispatch(
        createAction(
          ADD_TO_CART,
          {
            ...item,
            amount: parseInt(amount),
          },
          amount
        )
      );
      setPopupSuccess(true);
      setTimeout(() => {
        setPopupSuccess(false);
      }, 2500);
    }
  };
  //Handle Choose Size
  const handleChooseSize = (idCheck, idItem) => {
    dispatch(createAction('CHOOSE_SIZE', idCheck, idItem));
    setSizeShoe(true);
    setChangeSize(!changeSize);
  };

  //Render Shoe Detail
  const renderShoeDetail = () => {
    return shoeDetail
      .filter((item) => item.id === Number(idParams))
      .map((item) => {
        return (
          <div key={item.id} className="shoeDetail__items__item">
            <div className="shoeDetail__items__item__image">
              <SRLWrapper
                style={{ width: '100%', height: '100%' }}
                options={options}
              >
                <img src={item.linkImage} alt={`img-shoe${item.id}`} />{' '}
              </SRLWrapper>
              <div className="shoeDetail__items__item__image__detail">
                {/* if Image Detail DEFINE MAP  */}
                {item.imageDetail?.map((imageDetail) => {
                  return (
                    <SRLWrapper key={imageDetail.id} options={options}>
                      <div
                        key={imageDetail.id}
                        className="shoeDetail__items__item__image__detail__imageDetail"
                      >
                        <a href={imageDetail.linkImage}>
                          <img
                            src={imageDetail.linkImage}
                            alt={`${item.name}-${imageDetail.id}`}
                          />
                        </a>
                      </div>
                    </SRLWrapper>
                  );
                })}
              </div>
            </div>

            <div className="shoeDetail__items__item__name">
              <h1>{item.name}</h1>
              <h3>{item.typeName}</h3>
              <p>
                Price:
                <span className="shoeDetail__items__item__name__price">
                  {item.priceDiscount === null ? (
                    <span className="price">
                      {item.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  ) : (
                    <span className="priceDiscount">
                      <del>
                        {item.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </del>
                      <span>
                        {item.priceDiscount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </span>
                  )}
                </span>
              </p>
              <div className="shoeDetail__items__item__name__size">
                <h2>
                  Size :
                  {item.sizeShoes
                    ?.filter((item) => item.check === true)
                    .map((item2) => {
                      return (
                        <span className="" variant="outlined" key={item2.id}>
                          {item2.size}
                        </span>
                      );
                    })}
                </h2>
                {item.sizeShoes?.map((item2) => {
                  return (
                    <button
                      className=""
                      variant="outlined"
                      key={item2.id}
                      onClick={() => handleChooseSize(item2.id, item.id)}
                    >
                      {item2.size}
                    </button>
                  );
                })}
              </div>
              <div className="shoeDetail__items__item__name__addAndAmount">
                <div className="shoeDetail__items__item__name__amount">
                  <div onClick={() => handleUpAndDownAmount('minus')}>
                    <NavigateBeforeIcon />
                  </div>
                  <span>{amount}</span>
                  <div onClick={() => handleUpAndDownAmount('plus')}>
                    <NavigateNextIcon />
                  </div>
                </div>
                <div
                  className="shoeDetail__items__item__name__addToCart"
                  onClick={() => handleAddToCart(item)}
                >
                  <p>ADD TO CART</p>
                  <div>
                    <ShoppingCartIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };

  const renderOtherShoes = () => {
    return shoeDetail
      .filter(
        (item) =>
          item.brand === shoeDetailRedux.brand &&
          item.type === shoeDetailRedux.type
      )
      .slice(1, 7)
      .map((item) => {
        return (
          <div key={item.id} className="shoeDetail__other__item">
            <Link
              to={`/shoe-detail/${item.id}`}
              onClick={() => handleShoeDetail(item)}
            >
              <div className="shoeDetail__other__item__image">
                <img src={item.linkImage} alt={`shoe-${item.id}`} />
              </div>
            </Link>
            <div className="shoeDetail__other__item__name">
              <h1>{item.name}</h1>
            </div>
            <div className="shoeDetail__other__item__price">
              <div className="shoeDetail__other__item__price__money">
                {item.priceDiscount === null ? (
                  <span>
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                ) : (
                  <div>
                    <del>
                      {item.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </del>
                    <span>
                      {item.priceDiscount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                )}
              </div>
              <div className="shoeDetail__other__item__price__iconCard">
                <StorefrontIcon />
              </div>
            </div>
          </div>
        );
      });
  };
  return (
    <div className="shoeDetail">
      <div className="shoeDetail__items">{renderShoeDetail()}</div>{' '}
      <h1 className="shoeDetail__titleOther">Other shoes</h1>
      <div className="shoeDetail__other">{renderOtherShoes()}</div>
      <h1 className="shoeDetail__titlePlayer">SELECT YOUR PLAYER</h1>
      <div className="shoeDetail__player">{renderPlayer()}</div>
      {popupSuccess && (
        <div>
          <Notification />
        </div>
      )}
      {err && (
        <div>
          <NotificationErr text="You need to choose the size before adding to cart!" />
        </div>
      )}
      {amount >= 6 && (
        <div>
          <NotificationErr text="You can only order up to 5 products!" />
        </div>
      )}
    </div>
  );
}

export default ShoeDetail;
