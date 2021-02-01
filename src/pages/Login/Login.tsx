import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { googleSignIn } = useContext(AuthContext);

  return (
    <div>
      Login
      <button onClick={() => googleSignIn()}>Google Login</button>
    </div>
  );
}

export default Login;
