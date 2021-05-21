import react from 'react';
import Header from './Header';
import Menu from './Menu';

export default class Pvp extends react.Component {
    render() {
        return (
            <div id="todo">
                <div className="clouds"></div>
                <div className="fogContainer">
                    <div className="fog">
                    </div>
                    <div id="containerlog" className="perfil" >
                        <Header userName={JSON.parse(sessionStorage.getItem("Usuari")).usuari} />
                        <Menu/>
                        <p>PVP</p>
                    </div>
                </div>
            </div>
        )
    }
}