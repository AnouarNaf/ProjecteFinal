import react from 'react';
import Header from './Header';
import Menu from './Menu';
import '../Styles/Settings.css';
import Axios from "axios";
import CanviarP from "./CanviarP";

export default class Settings extends react.Component {
    constructor(props) {
        super(props)
        this.state = () => {};
        this.changeStat= this.changeStat.bind(this);
        // this.ponerState = this.ponerState.bind(this);
    }
    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    async componentDidMount() {
        console.log(this.usuario);
        const res = await Axios.get(`http://localhost:3001/api/GetSettingsUsuari/${this.usuario}`);
        // this.setState({ usuari: res.data[0].Usuari, correu: res.data[0].correu, data: res.data, stat: true });
        this.setState({usuari:res.data[0].Usuari,correu: res.data[0].correu, data: res.data, stat: true});       
        console.log("state Dentro", this.state);
    }
    changeStat(){
        this.setState({stat:false});
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
                        <p id="canviarCont"  onClick={() => this.changeStat()}>Canviar contrasenya</p>
                        {!this.state.stat ? <CanviarP ponerState={this.setState}/> : <fieldset className="monstresDataGrid">
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