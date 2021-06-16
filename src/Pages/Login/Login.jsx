import React from 'react';
import './Login.scss';

function Login() {
  return (
    <div className="login">
      <div className="login__content">
        <h1 className="login__content__name">Login</h1>
        <p>Fill all form field go to next step</p>
        <div className="login__content__fill">
          <label>User</label>
          <input placeholder="User..." />

          <label>Password</label>
          <input type="text" placeholder="Password" />
        </div>
        <div className="login__content__submit">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
