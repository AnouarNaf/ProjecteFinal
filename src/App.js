import React,{useState, useEffect} from 'react';
import './App.css';
import Axios from "axios"; 
function App() {
    const x = "";
    const [data, setData] = React.useState(null);
    const [usu, setusuario]= useState("");
    const [cont, setcontraseña]= useState("");
    const submitReview = () =>{
        Axios.post("http://localhost:3001/api",{usuario: usu, contraseña: cont}).then(() => {alert("okay")});
        };
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);


    return (
        < div className="App" >
            <div>
                <label>User</label>
                <input 
                    onChange={(e)=>{ setusuario(e.target.value); }}
                     type="text" placeholde="data" name="user"/>
                <label>Password</label>
                <input 
                  onChange={(e)=>{ setcontraseña(e.target.value);}}
                  type="text" name="pass"/><br></br>
                <button onClick={submitReview}>Entrar</button>
            </div>
            <div id="invisible_box">
               
            </div>
        </div>
    );
}

export default App;