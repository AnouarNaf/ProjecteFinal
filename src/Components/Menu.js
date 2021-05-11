import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
    render() {
        return (
            <div id="submenu">
                <div id="boton_menu">
                    <b className="boton">
                        <Link to="/Perfil">Perfil</Link>
                    </b>
                    <b className="boton">
                        <Link to="/Pvp">PvP</Link>
                    </b>
                    <b className="boton">
                        <Link to="/Entrenamiento">Entrenamiento</Link>
                    </b>
                    <b className="boton">
                        <Link to="/Friends">Friends</Link>
                    </b>
                </div>
            </div>)
    }
}