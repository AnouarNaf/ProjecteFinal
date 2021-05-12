import react from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import '../Styles/Header.css';
import { Link } from 'react-router-dom';
import titulo from '../imgs/Login/titulo.png';
export default class Header extends react.Component {

    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    Logout(){
        sessionStorage.clear();
    }
    render(){
        return(
            <div className="header">
                <div id="texto_header">
                    <b id="usu_header">{this.usuario}</b>                   
                    <Link to="/login" className="LinkLog"><AiOutlineLogout className="LogoutButton" onClick={this.Logout}/></Link>
                </div>
            </div>
        )
    }
}