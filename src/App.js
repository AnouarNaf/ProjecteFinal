import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";
function App() {
    const [dataC, setDataC] = React.useState(null);
    const [usu, setusuario]= useState("");
    const [cont, setcontraseña]= useState("");
    const submitReview = () =>{
        console.log("CLICK");
        // Axios.post("http://localhost:3001/api",{usuario: usu, contraseña: cont})
        // .then(fetch("/api/enviar").then((res) => res.json()).then((data) => setDataC(data.mensaje)))
        Axios.post("http://localhost:3001/api",{usuario: usu, contraseña: cont})
        .then((res) => setDataC(res.data.mensaje))
        }
    useEffect(() => {
        fetch("/api/enviar")
            .then((res) => res.json())
            .then((data) => setDataC(data.mensaje));
    }, []);

    return (
        < div className="App" >
            <div>
                <label>User</label>
                <input 
                    onChange={(e)=>{ setusuario(e.target.value); }}
                     type="text" name="user"/>
                <label>Password</label>
                <input 
                  onChange={(e)=>{ setcontraseña(e.target.value);}}
                  type="password" name="pass"/><br></br>
                <button onClick={submitReview}>Entrar</button>
            </div>
            <div id="invisible_box">
               <p>{!dataC ? "Loading..." : dataC}</p>
            </div>
        </div>
    );
}

export default App;