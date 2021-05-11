import React, { useState} from 'react';
import '../Styles/login.css';
import Axios from "axios";

import {
    useHistory
} from "react-router-dom";
import cadenas from '../imgs/Login/cadenas.png';

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

        const user_without_spaces = reg_usuario.replace(/\s/g, '');
        if(user_without_spaces.length !== reg_usuario.length)return alert("L'usuari no pot tenir espais")
        if(reg_usuario.length === 0)return alert("Has d'introduir un valor de usuari")
        if(reg_usuario.length === 1)return alert("L'usuari ha de tenir mes de un caracter")
        if(reg_contraseña.length === 0)return alert("Has d'introduir un valor de password")
        if(reg_gmail.length === 0)return alert("Has d'introduir un valor de correu")


        Axios.post("http://localhost:3001/api/ComprobarUsuario", { usuario: reg_usuario }).then((res) => registro(res.data.mensaje, reg_usuario, reg_contraseña, reg_gmail))
        /*.then((res) => setDataC(res.data.mensaje)).then((res)=> alerta(res.data.mensaje))*/
    }

    /* FUNCTIONS */

    function registro(x, user, password, email) {
        if (x === "false") {
            Axios.post("http://localhost:3001/api/InsertarUsuario", { usuario: user, contraseña: password, gmail: email }).then((res) => alert(res.data.mensaje));
        } else {
            alert("L'usuari ja existeix");
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
                            <button onClick={login}>Entrar</button>
                        </div>
                    </div>
                    <img id="cadena_isq" src={cadenas}/>
                    <img id="cadena_de" src={cadenas}/>
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
                    <div className="row"><button onClick={register}>Entrar</button></div>
                </div>
                <div id="invisible_box">
                </div>
            </div>
    );
}

export default Login;