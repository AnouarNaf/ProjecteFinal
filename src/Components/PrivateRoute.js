// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

// async function Prueba(){
//   const [estado, setEstado] = useState(null);
//   var res = await axios.get(`http://localhost:3001/connectionStatus/${JSON.parse(sessionStorage.getItem("Usuari")).usuari}/${JSON.parse(sessionStorage.getItem("Usuari")).sessionid}`);
//   setEstado(res.data);
//   return estado;
// }

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  // var estado = false;
  // useEffect(() => {
  //   axios.get(`http://localhost:3001/connectionStatus/${JSON.parse(sessionStorage.getItem("Usuari")).usuari}/${JSON.parse(sessionStorage.getItem("Usuari")).sessionid}`).then((res) => estado = res.data);
  //   console.log("dentro " + estado)
  //     }, []);

  var isLoggedIn = false;
  if(sessionStorage.getItem("Usuari") != null){
    isLoggedIn = JSON.parse(sessionStorage.getItem("Usuari")).logged;
  }
  else{
    isLoggedIn = false;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute