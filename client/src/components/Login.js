import React, { useState } from "react";
import axiosWithAuth from '../axios/AxiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [users, setUsers] = useState({username: '', password: ''})

  const handleChange = e => {
    setUsers({
      ...users, 
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, users)
    .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles')
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form className= "loginForm" onSubmit={login}>
        <h2>Login Here</h2>
        <label>Username</label>
        <input
          type='text'
          name='username'
          value={users.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={users.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
