import { dataProduct } from '../../listProducts';
import { dataPlayer } from '../../listProducts';
import {
  ADD_TO_CART,
  ITEM_DETAIL,
  LIST_SEARCH,
  LOGOUT,
  REMOVE_ITEM,
  RESET_STATUS_LOGIN,
  RESET_STATUS_SIGNUP,
  SIGN_UP,
  UP_AND_DOWN_CART,
  USER_LOGIN,
} from '../Constants';
let initailState = {
  shoe: dataProduct,
  player: dataPlayer,
  shoeDetail: {},
  search: '',
  cart: [],
  listSearch: [],
  totalCart: 0,
  dataUserLogin: localStorage.getItem('data-users')
    ? JSON.parse(localStorage.getItem('data-users'))
    : [
        {
          id: 0,
          user: 'dtvshoes@gmail.com',
          password: '123456',
        },
        {
          id: 1,
          user: '123456',
          password: '123456',
        },
      ],
  userLogin: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  statusLogin: 'waiting',
  statusSignup: 'waiting',
};
export const ShoesReducer = (state = initailState, action) => {
  switch (action.type) {
    case ITEM_DETAIL:
      state.shoeDetail = action.data;
      return { ...state };
    case 'SEARCH':
      state.search = action.data;
      return { ...state };
    case LIST_SEARCH:
      return { ...state, listSearch: [...state.listSearch, action.data] };
    case ADD_TO_CART:
      let cloneCart = [...state.cart];
      const index = cloneCart.findIndex((item) => item.id === action.data.id);
      //Amount in shoesDetail
      let amount = action.id;
      if (index >= 0) {
        let newArr = cloneCart.map((item) => {
          // && item.sizeShoes[item.id].size === action.data.sizeShoes[action.data.id].size
          if (item.id === action.data.id) {
            if (item.amount === null) {
              return { ...item, amount: item.amount + 1 };
            } else {
              //ACTION ID IS AMOUNT IN SHOES DETAIL
              return { ...item, amount: item.amount + amount };
            }
          } else {
            return { ...item };
          }
        });
        state.cart = newArr;
        return {
          ...state,
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.data],
      };
    case REMOVE_ITEM:
      let cloneCartDele = [...state.cart];
      let idItem = action.data;

      const inde = cloneCartDele.findIndex((item) => item.id === idItem);

      if (inde >= 0) {
        cloneCartDele.splice(inde, 1);
      } else {
        console.warn(`Cant remove product (id: ${idItem}) as its not working`);
      }
      state.cart = cloneCartDele;
      return { ...state };
    case UP_AND_DOWN_CART:
      let arrCartUpDown = [...state.cart];

      let idItemUpDown = action.data;

      const upAndDown = arrCartUpDown.map((item) => {
        if (action.id === 'up' && item.id === idItemUpDown) {
          return { ...item, amount: item.amount + 1 };
        }
        if (
          action.id === 'down' &&
          item.id === idItemUpDown &&
          item.amount > 1
        ) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return { ...item };
        }
      });
      // state.cart = upAndDown;
      return { ...state, cart: [...upAndDown] };

    case 'CHOOSE_SIZE':
      let cloneShoesArr = [...state.shoe];

      // console.log(action.data,action.id);
      cloneShoesArr = cloneShoesArr.map((item) => {
        if (item.id === action.id) {
          return item?.sizeShoes.map((item2) => {
            if (item2.id === action.data) {
              item2.check = true;
              return { ...state };
            } else {
              item2.check = false;
              return { ...state };
            }
          });
        }
        return { ...state };
      });
      return {
        ...state,
      };
    case USER_LOGIN:
      state.statusLogin = true;
      let cloneDataUser = [...state.dataUserLogin];
      //Check data User exist
      let indexFilter = cloneDataUser.some(
        (user) =>
          user.user === action.data.user &&
          user.password === action.data.password
      );

      if (!indexFilter) {
        state.statusLogin = false;
        return { ...state };
      }

      //Login successfully
      if (indexFilter) {
        let user = state.userLogin;
        user = {
          user: action.data.user,
          password: action.data.password,
        };

        state.statusLogin = true;
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: action.data.user,
            password: action.data.password,
          })
        );
        localStorage.setItem('data-users', JSON.stringify(state.dataUserLogin));
        return { ...state, userLogin: user };
      }
      return { ...state };

    case SIGN_UP:
      state.statusSignup = true;
      const cloneDataUserBeforeSignUp = [...state.dataUserLogin];
      const checkUserExist = cloneDataUserBeforeSignUp.some(
        (user) => user.user === action.data.user
      );

      //If user existed , alert client choose difference username
      if (checkUserExist) {
        state.statusSignup = false;
        return { ...state };
      }

      //Sign up successfully
      if (!checkUserExist) {
        state.statusSignup = true;
        state.dataUserLogin.push({
          id: new Date().getTime() + Math.random(),
          user: action.data.user,
          password: action.data.password,
        });

        state.userLogin = {
          user: action.data.user,
          password: action.data.password,
        };

        localStorage.setItem(
          'user',
          JSON.stringify({
            user: action.data.user,
            password: action.data.password,
          })
        );

        localStorage.setItem('data-users', JSON.stringify(state.dataUserLogin));
        return { ...state };
      }

      return { ...state };
    case RESET_STATUS_LOGIN:
      state.statusLogin = 'waiting';
      return { ...state };
    case RESET_STATUS_SIGNUP:
      state.statusSignup = 'waiting';
      return { ...state };
    case LOGOUT:
      localStorage.removeItem('user');
      state.userLogin = {};
      return { ...state };
    default:
      return { ...state };
  }
};
