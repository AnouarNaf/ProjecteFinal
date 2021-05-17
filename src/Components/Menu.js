import React from 'react';
import { Link } from 'react-router-dom';
import boton_perfil from '../imgs/Perfil/inventario/boton_perfil.png';
import boton_pvp from '../imgs/Perfil/inventario/boton_pvp.png';
import boton_ent from '../imgs/Perfil/inventario/boton_entrenamiento.png';
import boton_amigos from '../imgs/Perfil/inventario/boton_amigos.png';
import '../Styles/Menu.css';

export default class Menu extends React.Component {
    render() {
        return (
            <div className="posicion">
                <div id="submenu">
                    <div id="boton_menu">
                        <b className="boton">
                            <Link className="LinksHeader" to="/Perfil"><img src={boton_perfil} /></Link>
                        </b>
                        <b className="boton">
                            <Link className="LinksHeader" to="/Pvp"><img src={boton_pvp} /></Link>
                        </b>
                        <b className="boton">
                            <Link className="LinksHeader" to="/Entrenamiento"><img src={boton_ent} /></Link>
                        </b>
                        <b className="boton">
                            <Link className="LinksHeader" to="/Friends"><img src={boton_amigos} /></Link>
                        </b>
                    </div>
                </div>
            </div>
        )
    }
}