import react from 'react';
import { AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import '../Styles/Header.css';
import { Link } from 'react-router-dom';
export default class Header extends react.Component {

    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    Logout(){
        sessionStorage.clear();
    }
    render(){
        return(
            <div className="header">
                <div id="texto_header">
                    <Link to="/Pvp" className="LinksHeader"><b id="usu_header">{this.props.userName}</b></Link>
                    <Link to="/Opcions" className="LinksHeader"><AiFillSetting className="IconsButtons"/></Link>
                    <Link to="/login" className="LinksHeader"><AiOutlineLogout className="IconsButtons" onClick={this.Logout}/></Link>                    
                </div>
            </div>
        )
    }
}