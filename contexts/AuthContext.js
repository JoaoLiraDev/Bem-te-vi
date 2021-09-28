import { createContext, useState, useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next//router';
import { api } from '../services/api';
import { dadosUser } from '../services/funcContextUser'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {


  const [user, setUser] = useState({
    id_user: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  const isAuthenticated = !!user

  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: '',
    token: ''
  });

  useEffect(() => {

    const { MQtoken } = parseCookies()

    if (MQtoken) {
      dadosUser().then(response => {
        setUser({
          id_user: response.user.ID_USERS,
          username: response.user.USERNAME,
          first_name: response.user.FIRST_NAME,
          last_name: response.user.LAST_NAME,
          email: response.user.EMAIL,
        });
      })
    }
  }, [])

  async function singIn(login) {

    try {
      const res = await fetch('http://localhost:8080/Usuarios/login', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: { 'Content-Type': 'application/json' }
      });

      const responseEnv = await res.json();

      if (responseEnv.mensagem == "Falha na autenticação") {
        setResponse({
          formSave: false,
          type: 'error',
          message: responseEnv.mensagem,
          token: '-',
        });
        alert(responseEnv.mensagem)
        Router.reload()
      } else {

        setResponse({
          formSave: false,
          type: 'success',
          message: responseEnv.mensagem,
          token: responseEnv.token
        });

        setCookie(undefined, 'MQtoken', responseEnv.token, {
          maxAge: 60 * 60 * 5 //5_horas,
        });

        setUser({
          id_user: responseEnv.user.id_user,
          username: responseEnv.user.username,
          first_name: responseEnv.user.first_name,
          last_name: responseEnv.user.last_name,
          email: responseEnv.user.email,
        });


        api.defaults.headers['Authorization'] = `Bearer ${responseEnv.token}`;

        Router.push('/')
      }
    } catch (err) {
      setResponse({
        formSave: false,
        type: 'error',
        message: "Erro: Falha ao realizar login!",
        token: '-'
      });
    }

  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  )
}