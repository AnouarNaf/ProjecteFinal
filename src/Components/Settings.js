import react from 'react';
import Header from './Header';
import Menu from './Menu';
import '../Styles/Settings.css';
import Axios from "axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default class Settings extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: null,
            newPass: null,
            passR: null,
            usuari: "",
            correu: "",
            estadoBotonesUsuario: false
        };
        this.changeStat = this.changeStat.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsuari = this.changeUsuari.bind(this);
        this.cancelUsuari = this.cancelUsuari.bind(this);
        this.cancelCorreu = this.cancelCorreu.bind(this);
    }
    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    async componentDidMount() {
        const res = await Axios.get(`http://localhost:3001/api/GetSettingsUsuari/${this.usuario}`);
        this.setState({ usuari: res.data[0].Usuari, correu: res.data[0].correu, data: res.data, stat: true });
    }

    changeStat(x) {
        this.setState({ stat: x });
    }
    async changePassword(pass, newpass, repeatNewPass) {
        const res = await Axios.post("http://localhost:3001/api/validarUsuario", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, contraseña: pass })
        if (res.data.mensaje === "True") {
            if (newpass === repeatNewPass) {
                Axios.post("http://localhost:3001/changePassword", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, newPassword: newpass }).then((res) => alert(res.data.mensaje))
                this.setState({ password: null, newPass: null, passR: null });
            } else {
                alert("Les contrasenyes no son iguals");
            }
        } else {
            alert("contrasenya Incorrecta");
        }
    }
    async changeUsuari(newuser) {
        const res = await Axios.post("http://localhost:3001/api/ComprobarUsuario", { usuario: newuser });
        if (res.data.mensaje === "false") {
            Axios.post("http://localhost:3001/changeUsuari", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, newUsuari: newuser }).then((res) => alert(res.data.mensaje));
            sessionStorage.setItem("Usuari", JSON.stringify({
                usuari: newuser,
                logged: true
            }));
            this.setState({ usuari: newuser });
        } else {
            alert("Aquest usuari ja existeix");
        }
    }
    cancelUsuari() {
        this.setState({ usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari });
    }
    async cancelCorreu() {
        const res = await Axios.get(`http://localhost:3001/api/GetCorreuUsuari/${JSON.parse(sessionStorage.getItem("Usuari")).usuari}`);
        this.setState({ correu: res.data[0].correu });
    }
    async changeCorreu(newCorreu) {
        Axios.post("http://localhost:3001/changeCorreu", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, correu: newCorreu }).then((res) => alert(res.data.mensaje));
    }
    render() {
        return (
            <div id="todo">
                <div className="clouds"></div>
                <div className="fogContainer">
                    <div className="fog">
                    </div>
                    <div id="containerlog" className="perfil" >
                        {<Header />}
                        <Menu />
                        <div id="settingsDiv" className="background_Formularis">
                            <h1>OPCIONS</h1>
                            <div className="Container">
                                <p>Usuari: <input id="inputUsuario" type="text" value={this.state.usuari} onChange={(e) => { this.setState({ usuari: e.target.value }) }}></input></p>
                                <div>
                                    <div className="botonesPeques BotonAcceptar" onClick={() => this.changeUsuari(this.state.usuari)}><AiOutlineCheck /></div>
                                    <div className="botonesPeques BotonCancelar" onClick={this.cancelUsuari}><AiOutlineClose /></div>
                                </div>
                            </div>
                            <div className="Container">
                                <p>Correu: <input id="inputCorreu" type="text" value={this.state.correu} onChange={(e) => { this.setState({ correu: e.target.value }) }}></input></p>
                                <div className="botonesPeques BotonAcceptar" onClick={() => this.changeCorreu(this.state.correu)}><AiOutlineCheck /></div>
                                <div className="botonesPeques BotonCancelar" onClick={this.cancelCorreu}><AiOutlineClose /></div>
                            </div>
                            {!this.state.stat ? null :
                                <div className="Container"><p id="canviarCont" onClick={() => this.changeStat(false)}>Canviar contrasenya</p></div>}
                            {this.state.stat ?
                                <fieldset className="monstresDataGrid">
                                    <legend><b>MONSTRES</b></legend>
                                    <table >
                                        <tbody>
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
                                                    <tr key={i}>
                                                        <td>{x.NomMonstre}</td>
                                                        <td>{Math.trunc(x.Punts_Gastats / 5)}</td>
                                                        <td>{x.Dany}</td>
                                                        <td>{x.Vida}</td>
                                                        <td>{x.Armadura}</td>
                                                        <td>{x.Esquiva}</td>
                                                        <td>{x.Punts_Actius}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </fieldset> :
                                <div className="formularioChangePass">
                                    <h2>Canviar Contrasenya</h2>
                                    <div className="inputs">
                                        <div className="Container">
                                            <p>Contrasenya Actual</p>
                                            <input type="password" onChange={(e) => { this.setState({ password: e.target.value }); }}></input>
                                        </div>
                                        <div className="Container">
                                            <p>Contrasenya Nova</p>
                                            <input type="password" onChange={(e) => { this.setState({ newPass: e.target.value }); }}></input>
                                        </div>
                                        <div className="Container">
                                            <p>Repeteix Contrasenya Nova</p>
                                            <input type="password" onChange={(e) => { this.setState({ passR: e.target.value }); }}></input>
                                        </div>
                                    </div>
                                    <div id="posicionBotonAccept">
                                        <button className="button buttonAccept" onClick={() => this.changePassword(this.state.password, this.state.newPass, this.state.passR)}>Confirmar</button>
                                    </div>
                                    <div id="posicionBotonCancel">
                                        <button className="button buttonCancel" onClick={() => this.changeStat(true)}>Cancelar</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}