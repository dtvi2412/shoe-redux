import './App.scss';

import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePages from './Pages/HomePages/HomePages';
import ShoesBrand from './Pages/ShoesBrand/ShoesBrand';
import { useEffect, useState } from 'react';
import ShoeDetail from './Pages/ShoeDetail/ShoeDetail';
import Search from './Pages/Search/Search';
import Cart from './Pages/Cart/Cart';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import { useDispatch } from 'react-redux';
import { createAction } from './Redux/Action';
import { USER_LOGIN } from './Redux/Constants';
function App() {
  const [backToTop, setBackToTop] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 180) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });

    const checkHasUser = localStorage.getItem('user');

    if (checkHasUser) {
      dispatch(createAction(USER_LOGIN, JSON.parse(checkHasUser)));
    }
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/cart" component={Cart} />
          <Route path="/shoe-detail/:id" component={ShoeDetail} />
          <Route path="/:id" component={ShoesBrand} />

          <Route exact path="/" component={HomePages} />
        </Switch>
        {backToTop && (
          <div
            className="app__backToTop"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <h1>Back To Top</h1>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
