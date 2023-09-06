import React, { useEffect } from 'react'
import Layout from './Screens/Layout'
import { callPost } from './Utils'
import { useDispatch } from 'react-redux';
import { setUser } from './Store/User/slice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const verifyJWT = async () => {
      let JWT = localStorage.getItem('JWT')
      if (JWT) {
        const resApi = await callPost('/users/verifyToken', {
          jwToken: JWT
        })
        if (resApi && resApi.user) {
          dispatch(setUser(resApi.user))
        }
        else {
          //TODO : afficher un message d'erreur
          localStorage.removeItem('JWT')
        }
      }
      else {
        return
      }
    }
    verifyJWT()
  }, [dispatch])

  return (
    <div>
      <Layout />
    </div>
  )
}

export default App
