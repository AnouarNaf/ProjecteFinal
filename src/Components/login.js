import React, { useState} from 'react';
import '../Styles/login.css';
import Axios from "axios";

import {
    useHistory
} from "react-router-dom";
import cadenas from '../imgs/Login/cadenas.png';
import cadenas2 from '../imgs/Login/cadena_2.png';
import boton from '../imgs/Login/boton.png';
function Login() {
    const history = useHistory();
    //-----------Login--------------//
    // const [dataC, setDataC] = React.useState(null);
    const [usu, setusuario] = useState("");
    const [cont, setcontraseña] = useState("");
    //--------------Registro-----------//
    const [reg_usuario, setusuarioreg] = useState("");
    const [reg_contraseña, setcontraseñareg] = useState("");
    const [reg_gmail, setgmailreg] = useState("");
    const login = () => {
        // console.log("CLICK");
        Axios.post("http://localhost:3001/api/validarUsuario", { usuario: usu, contraseña: cont }).then((res) => RespuestaLogin(res.data.mensaje, usu))
        /*.then((res) => setDataC(res.data.mensaje)).then((res)=> alerta(res.data.mensaje))*/
    }
    const register = () => {
        Axios.post("http://localhost:3001/api/ComprobarUsuario", { usuario: reg_usuario }).then((res) => registro(res.data.mensaje, reg_usuario, reg_contraseña, reg_gmail))

        /*.then((res) => setDataC(res.data.mensaje)).then((res)=> alerta(res.data.mensaje))*/
    }

    /* FUNCTIONS */

    function registro(x, user, password, email) {
        console.log(x);
        if (x === "false") {
            alert("el usuario es correcto");
            Axios.post("http://localhost:3001/api/InsertarUsuario", { usuario: user, contraseña: password, gmail: email }).then((res) => alert(res.data.mensaje))
        } else {
            alert("el usuario ya existe");
        }
    }
    
    function RespuestaLogin(res, usuari) {
        if (res === "True") {
            sessionStorage.setItem("Usuari", JSON.stringify({
                usuari,
                logged: true
            }));
            history.push("/perfil");
        }
        else {
            alert(res);            
        }
    }

    return (
            <div className="App" >
                <div id="titulo" className="row"><h1>Bestiario</h1></div>
                <div className="container">                 
                    <div id="row_log" >
                        <div id="login" >
                            <div id="log_title" className="row"><h3>Log In</h3></div>
                            <div className="row"><label>User</label></div>
                            <div className="row input"><input id="inptxt" onChange={(e) => { setusuario(e.target.value); }} type="text" placeholde="data" name="user" /></div>
                            <div className="row"><label>Password</label></div>
                            <div className="row input"><input id="inptxt" onChange={(e) => { setcontraseña(e.target.value); }} type="password" name="pass" /><br></br></div>
                            {/* <button className="boton" onClick={login}>Entrar</button> */}
                            <img onClick={login} id="botonlog" src={boton}/>
                        </div>
                    </div>
                    <img id="cadena_isq" src={cadenas}/>
                    <img id="cadena_de" src={cadenas}/>
                    <img id="cadena_2" src={cadenas2}/>
                    <div id="row_reg" >
                        <div id="Register" >
                            <div id="log_title" className="row"><h3>Register</h3></div>
                            <div className="row"><label>User</label></div>
                            <div className="row input"><input id="inptxt" onChange={(e) => { setusuarioreg(e.target.value); }} type="text" placeholde="data" name="user" /></div>
                            <div className="row"><label >Password</label></div>
                            <div className="row input"><input id="inptxt" onChange={(e) => { setcontraseñareg(e.target.value); }} type="password" name="pass" /><br></br></div>
                            <div className="row"><label>Gmail</label></div>
                            <div className="row input"><input  id="inptxt" onChange={(e) => { setgmailreg(e.target.value); }} type="text" name="pass" /><br></br></div>                   
                        </div>
                    </div>
                    <img id="cadena_2_2" src={cadenas2}/>
                    <div className="row">
                        {/* <button className="boton" onClick={register}>Entrar</button> */}
                        <img onClick={register} id="boton" src={boton}/>
                        </div>
                </div>
                <div id="invisible_box">
                </div>
            </div>
    );
}

export default Login;