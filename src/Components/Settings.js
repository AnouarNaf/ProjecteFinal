import react from 'react';
import Header from './Header';
import Menu from './Menu';
import '../Styles/Settings.css';
import Axios from "axios";
import CanviarP from "./CanviarP";

function changeStat(x){
    console.log(this.state);
}
function posarState(usuari,correu,data,stat){
    this.setState({ AA:"usuari, correu, data, stat"});
    console.log("stat POSARSTATE", this.state);
}

export default class Settings extends react.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // changeStat= changeStat.bind(this);
        posarState = posarState.bind(this);
    }
    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    async componentDidMount() {
        console.log(this.usuario);
        const res = await Axios.get(`http://localhost:3001/api/GetSettingsUsuari/${this.usuario}`);
        // this.setState({ usuari: res.data[0].Usuari, correu: res.data[0].correu, data: res.data, stat: true });
        posarState(res.data[0].Usuari, res.data[0].correu,res.data,true);
        console.log("state Dentro", this.state);
    }
    render() {
        return (
            <div id="todo">
                <div id="containerlog" className="perfil" >
                    <Header />
                    <Menu />
                    <div id="settingsDiv" className="background_Formularis">
                        <h1>SETTINGS</h1>
                        <p>Usuari: {this.state.usuari}</p>
                        <p>Correu: {this.state.correu}</p>
                        <p id="canviarCont"  onClick={() => changeStat(false)}>Canviar contrasenya</p>
                        {!this.state.stat ? <CanviarP /> : <fieldset className="monstresDataGrid">
                            <legend>Monstres</legend>
                            <table >
                                <tr>
                                    <th>Monstre</th>
                                    <th>Nivell</th>
                                    <th>Dany</th>
                                    <th>Vida</th>
                                    <th>Armadura</th>
                                    <th>Esquiva</th>
                                    <th>Punts</th>
                                </tr>
                                {this.state.data.map((x, i) => {
                                    return (
                                        <tr >
                                            <td>{x.NomMonstre}</td>
                                            <td>{x.Punts_Gastats}</td>
                                            <td>{x.Dany}</td>
                                            <td>{x.Vida}</td>
                                            <td>{x.Armadura}</td>
                                            <td>{x.Esquiva}</td>
                                            <td>{x.Punts_Actius}</td>
                                        </tr>)
                                })}
                            </table>
                        </fieldset>}
                    </div>
                </div>
            </div>
        )
    }
}