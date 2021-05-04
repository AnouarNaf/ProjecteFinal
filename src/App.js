import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";
function alerta(x){
alert(x);
}

 function App() {
    const [dataC, setDataC] = React.useState(null);
    const [usu, setusuario]= useState("");
    const [cont, setcontraseña]= useState("");
    const submitReview = () =>{
        console.log("CLICK");
        // Axios.post("http://localhost:3001/api",{usuario: usu, contraseña: cont})
        // .then(fetch("/api/enviar").then((res) => res.json()).then((data) => setDataC(data.mensaje)))
          Axios.post("http://localhost:3001/api/ComprobarUsuario",{usuario: usu, contraseña: cont}).then((res)=> alerta(res.data.mensaje))
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
                    <div className="row"><input onChange={(e)=>{ setcontraseña(e.target.value);}} type="text" name="pass"/><br></br></div>
                    <button onClick={submitReview}>Entrar</button>
                </div>
             </div>
             <div id="row_reg" >
                <div id="Register" >
                    <div id="log_title" className="row"><h3>Register</h3></div>
                    <div className="row"><label>User</label></div>
                    <div className="row"><input type="text" placeholde="data" name="user"/></div>
                    <div className="row"><label>Password</label></div>
                    <div className="row"><input type="text" name="pass"/><br></br></div>
                    <div className="row"><label>Gmail</label></div>
                    <div className="row"><input type="text" name="pass"/><br></br></div>
                    <div className="row"><button>Entrar</button></div>
                </div>
             </div>
        </div>
        <div id="invisible_box">
        
        </div>
    </div>
    );
}

export default App;