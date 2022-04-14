import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from '../../Redux/Action';
import './signup.scss';
import { RESET_STATUS_SIGNUP, SIGN_UP } from './../../Redux/Constants/index';
import { Redirect } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((user) => user.ShoesReducer.userLogin);
  const statusSignup = useSelector(
    (status) => status.ShoesReducer.statusSignup
  );

  //Handle Click Login
  const handleSignUp = (e) => {
    e.preventDefault();

    const checkSpaceUser = user.split('').some((item) => item === ' ');
    const checkSpacePassword = password.split('').some((item) => item === ' ');

    if (user === '' || password === '') {
      alert('You need fill information!');
    } else if (checkSpaceUser || checkSpacePassword) {
      alert('You must not have spaces in your email or password!');
    } else {
      dispatch(
        createAction(SIGN_UP, {
          user,
          password,
        })
      );
    }
  };

  useEffect(() => {
    console.log(userLogin);
    Object.keys(userLogin).length > 0 && <Redirect to="/" />;
  }, [userLogin]);

  useEffect(() => {
    // remove status login
    return () => dispatch(createAction(RESET_STATUS_SIGNUP));
  }, [dispatch]);
  return (
    <React.Fragment>
      {Object.keys(userLogin).length === 0 ? (
        <form onSubmit={(e) => handleSignUp(e)} className="login">
          <div className="login__content">
            <h1 className="login__content__name">Sign up</h1>
            <p>Fill all form field go to next step</p>
            {!statusSignup && <p style={{ color: 'red' }}>User is exist!</p>}
            <div className="login__content__fill">
              <label>Username</label>
              <input
                placeholder="Username..."
                onChange={(e) => setUser(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login__content__submit">
              <button type="submit">Sign up</button>
            </div>
          </div>
        </form>
      ) : (
        <React.Fragment>{<Redirect to="/" />}</React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Login;
