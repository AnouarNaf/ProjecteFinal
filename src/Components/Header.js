import react from 'react';
import { AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import '../Styles/Header.css';
import { Link } from 'react-router-dom';
export default class Header extends react.Component {
    Logout(){
        sessionStorage.clear();
    }
    render(){
        return(
            <div className="header">
                <div id="texto_header">
                    <Link to="/Perfil"><b id="usu_header">{this.props.userName}</b> </Link>                  
                    <Link to="/login" className="LinkLog"><AiOutlineLogout className="LogoutButton" onClick={this.Logout}/></Link>
                    <Link to="/Opcions" className="LinkLog"><AiFillSetting className="LogoutButton"/></Link>
                </div>
            </div>
        )
    }
}