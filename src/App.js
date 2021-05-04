import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";
function alerta(x){
    
alert(x);
}
function registro(x, user,password, email){
    console.log(x);
    if(x=="false"){
        alert("el usuario es correcto");
        Axios.post("http://localhost:3001/api/InsertarUsuario",{usuario: user, contraseña: password, gmail: email}).then((res)=> alerta(res.data.mensaje))
    }else{
        alert("el usuario ya existe");
    }
    }

 function App() {
     //-----------Login--------------//
    const [dataC, setDataC] = React.useState(null);
    const [usu, setusuario]= useState("");
    const [cont, setcontraseña]= useState("");
    //--------------Registro-----------//
    const [reg_usuario,setusuarioreg]= useState("");
    const [reg_contraseña,setcontraseñareg]= useState("");
    const [reg_gmail,setgmailreg]= useState("");
    const login = () =>{
        console.log("CLICK");
          Axios.post("http://localhost:3001/api/validarUsuario",{usuario: usu, contraseña: cont}).then((res)=> alerta(res.data.mensaje))
        /*.then((res) => setDataC(res.data.mensaje)).then((res)=> alerta(res.data.mensaje))*/
        }
        const register = () =>{

            console.log("CLICK");
            Axios.post("http://localhost:3001/api/ComprobarUsuario",{usuario: reg_usuario}).then((res)=> registro(res.data.mensaje,reg_usuario,reg_contraseña,reg_gmail))

        /*.then((res) => setDataC(res.data.mensaje)).then((res)=> alerta(res.data.mensaje))*/
         }
         
     useEffect(() => {
        fetch("/api/enviar")
            .then((res) => res.json())
            .then((data) => setDataC(data.mensaje));
    }, []);

    return (
        < div className="App" >
        <div className="container">
            <div id="titulo" className="row"><h1>Bestiario</h1></div>
            <div id="row_log" >
                <div id="login" >
                    <div id="log_title" className="row"><h3>Log In</h3></div>
                    <div className="row"><label>User</label></div>
                    <div className="row"><input onChange={(e)=>{ setusuario(e.target.value); }} type="text" placeholde="data" name="user"/></div>
                    <div className="row"><label>Password</label></div>
                    <div className="row"><input onChange={(e)=>{ setcontraseña(e.target.value);}} type="password" name="pass"/><br></br></div>
                    <button onClick={login}>Entrar</button>
                </div>
             </div>
             <div id="row_reg" >
                <div id="Register" >
                    <div id="log_title" className="row"><h3>Register</h3></div>
                    <div className="row"><label>User</label></div>
                    <div className="row"><input onChange={(e)=>{ setusuarioreg(e.target.value); }} type="text" placeholde="data" name="user"/></div>
                    <div className="row"><label >Password</label></div>
                    <div className="row"><input onChange={(e)=>{ setcontraseñareg(e.target.value); }} type="password" name="pass"/><br></br></div>
                    <div className="row"><label>Gmail</label></div>
                    <div className="row"><input onChange={(e)=>{ setgmailreg(e.target.value); }} type="text" name="pass"/><br></br></div>
                    <div className="row"><button onClick={register}>Entrar</button></div>
                </div>
             </div>
        </div>
        <div id="invisible_box">
        
        </div>
    </div>
    );
}

export default App;