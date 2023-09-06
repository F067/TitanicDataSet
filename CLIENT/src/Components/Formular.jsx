import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup } from '@mui/material';
import { callPost } from '../Utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/User/slice';

const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9]).{8,}$/;

function Formular() {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyField, setIsEmptyField] = useState([]);

  const handleLogin = () => {
    setIsLogin(!isLogin)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      try {

        const requiredFields = ['email', 'password'];
        const errors = [];

        requiredFields.forEach(field => {
          if (formData[field] === '') {
            errors.push(field);
          }
        });

        setIsEmptyField(errors);

        const resApi = await callPost("/users/signIn", {
          email: formData.email,
          password: formData.password
        });

        let user = resApi.userExist;
        if (resApi.JWT) {
          localStorage.setItem('JWT', resApi.JWT)
        }
        dispatch(setUser(user));
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    else {
      try {
        const requiredFields = ['firstName', 'name', 'email', 'password'];
        const errors = [];

        requiredFields.forEach(field => {
          if (formData[field] === '') {
            errors.push(field);
          }
        });

        setIsEmptyField(errors);
        const resApi = await callPost('/users/signUp', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        let user = resApi.user;
        if (resApi.JWT) {
          localStorage.setItem('JWT', resApi.JWT)
        }
        dispatch(setUser(user));
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", backgroundColor: "white", borderRadius: "20px", width: "50%", height: "auto", padding: "20px", margin: '25px' }}>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: "center", color: 'white', backgroundColor: '#1875D1', borderTopLeftRadius: "15px", borderTopRightRadius: "15px", padding: '20px' }}>{` ${!isLogin ? "Create an account" : "Connect"}`}</h1>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <ButtonGroup >
          <Button
            style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }}
            onClick={handleLogin}
            variant={!isLogin ? "contained" : "outlined"}
            disabled={isLogin}
          >
            Connexion
          </Button>
          <Button
            style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }}
            onClick={handleLogin}
            variant={isLogin ? "contained" : "outlined"}
            disabled={!isLogin}
          >
            Créer un compte
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ textAlign: "center", marginBottom: "15px", width: "auto", fontSize: "12px", display: "flex", justifyContent: "center" }}>
        {errorMessage && (
          <div style={{ maxWidth: "80%", color: "red" , marginTop:'20px', fontWeight:'bold'}} className="error-message">{errorMessage}</div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {
          !isLogin && (
            <TextField
              value={formData.name}
              onChange={handleChange}
              name="name"
              label="Name"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={isEmptyField.includes("name")}
            />
          )}

        <TextField
          value={formData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          error={isEmptyField.includes("email")}
        />

        <TextField
          value={formData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
          type="password"
          error={isEmptyField.includes("password") || !passwordRegex.test(formData.password)}
        />

        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "16px" }}>
          <Button type="submit" variant='outlined'>
            {isLogin ? 'Connexion' : 'register'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Formular