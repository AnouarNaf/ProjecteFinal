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
            estadoBotonesUsuario: false,
            formularioCambiar: false,
            formularioPassword: "",
            formularioUsuario: false,
            formularioCorreo: false,
            usuarioCambiado: false,
            correoCambiado: false,
            correuActual: ""
        };
        this.changeStat = this.changeStat.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.comprovarUsuari = this.comprovarUsuari.bind(this);
        this.cancelUsuari = this.cancelUsuari.bind(this);
        this.cancelCorreu = this.cancelCorreu.bind(this);
        this.statusChangeCorreo = this.statusChangeCorreo.bind(this);
        this.usuarioOnChange = this.usuarioOnChange.bind(this);
    }
    usuario = JSON.parse(sessionStorage.getItem("Usuari")).usuari
    async componentDidMount() {
        const res = await Axios.get(`http://localhost:3001/api/GetSettingsUsuari/${this.usuario}`);
        this.setState({ usuari: res.data[0].Usuari, correu: res.data[0].correu, data: res.data, stat: true, correuActual: res.data[0].correu });
    }

    changeStat(x) {
        this.setState({ stat: x });
    }
    async changePassword(pass, newpass, repeatNewPass) {
        const res = await Axios.post("http://localhost:3001/api/validarUsuario", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, contraseña: pass })
        if (res.data.mensaje === "True") {
            if (newpass === repeatNewPass) {
                Axios.post("http://localhost:3001/changePassword", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, newPassword: newpass }).then((res) => alert(res.data.mensaje))
                this.setState({ password: "", newPass: "", passR: "" });
            } else {
                alert("Les contrasenyes no son iguals");
            }
        } else {
            alert("contrasenya Incorrecta");
        }
    }
    async comprovarUsuari(newuser) {
        const user_without_spaces = newuser.replace(/\s/g, '');
        if (user_without_spaces.length !== newuser.length) return alert("L'usuari no pot tenir espais")
        if (newuser.length === 0) return alert("Has d'introduir un valor de usuari")
        if (newuser.length === 1) return alert("L'usuari ha de tenir més de un caracter")
        if (newuser.length > 15) return alert("El maxim de caracters d'usuari es 15");

        const res = await Axios.post("http://localhost:3001/api/ComprobarUsuario", { usuario: newuser });
        if (res.data.mensaje === "false") {
            if (!this.state.formularioCambiar) {
                this.setState({
                    formularioCambiar: true,
                    mensajeFormulario: "Canviar nom d'usuari de " + JSON.parse(sessionStorage.getItem("Usuari")).usuari + " a: ",
                    mensajeFormulario2: newuser,
                    formularioUsuario: true
                });
            }
        } else {
            alert("Aquest usuari ja existeix");
        }
    }
    async changeUsuari(pass, newuser) {
        const res = await Axios.post("http://localhost:3001/api/validarUsuario", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, contraseña: pass });
        if (res.data.mensaje === "True") {
            Axios.post("http://localhost:3001/changeUsuari", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, newUsuari: newuser }).then((res) => alert(res.data.mensaje));
            sessionStorage.setItem("Usuari", JSON.stringify({
                usuari: newuser,
                logged: true
            }));
            this.setState({ usuari: newuser, formularioCambiar: false, formularioCorreo: false, formularioUsuario: false, usuarioCambiado: false });
        }
        else {
            alert(res.data.mensaje);
        }
    }
    cancelUsuari() {
        this.setState({ usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, usuarioCambiado: false });
    }
    async changeCorreu(pass, newCorreu) {
        const res = await Axios.post("http://localhost:3001/api/validarUsuario", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, contraseña: pass });
        if (res.data.mensaje === "True") {
            Axios.post("http://localhost:3001/changeCorreu", { usuari: JSON.parse(sessionStorage.getItem("Usuari")).usuari, correu: newCorreu }).then((res) => alert(res.data.mensaje));
            this.setState({ formularioCambiar: false, formularioCorreo: false, formularioUsuario: false, correoCambiado: false, correuActual: newCorreu });
        }
        else {
            alert(res.data.mensaje);
        }
    }
    async cancelCorreu() {
        this.setState({ correu: this.state.correuActual, correoCambiado: false });
    }
    async statusChangeCorreo() {
        this.setState({
            formularioCambiar: true,
            mensajeFormulario: "Modificar correu (" + this.state.correuActual + ") a:",
            mensajeFormulario2: this.state.correu,
            formularioCorreo: true
        });
    }
    cambiarEstadoFormulario(x) {
        this.setState({ formularioCambiar: x, formularioUsuario: false, formularioCorreo: false });
    }
    usuarioOnChange(e) {
        this.setState({ usuari: e.target.value })
        if (e.target.value === JSON.parse(sessionStorage.getItem("Usuari")).usuari) {
            this.setState({ usuarioCambiado: false })
        } else {
            this.setState({ usuarioCambiado: true })
        }
    }
    correoOnChange(e) {
        this.setState({ correu: e.target.value })
        if (e.target.value === this.state.correuActual) {
            this.setState({ correoCambiado: false })
        } else {
            this.setState({ correoCambiado: true })
        }
    }
    render() {
        return (
            <div id="todo">
                <div className="clouds"></div>
                <div className="fogContainer">
                    <div className="fog">
                    </div>
                    {this.state.formularioCambiar ?
                        <div className="alignContent">
                            <div className="formulario" onClick={() => this.cambiarEstadoFormulario(false)}>
                            </div>
                            <div className="background_Formularis formularioCambiar">
                                <div className="divContenidoFormulario">
                                    <p>{this.state.mensajeFormulario}</p>
                                    <p>{this.state.mensajeFormulario2}</p>
                                    <div className="Container">
                                        <p>Contrasenya</p>
                                        <input type="password" id="PasswordFormulario" value={this.formularioPassword} onChange={(e) => { this.setState({ formularioPassword: e.target.value }) }}></input>
                                    </div>
                                    {this.state.formularioUsuario ?
                                        <div className="posicionButtonAcceptConfirmar">
                                            <button className="button buttonAccept" onClick={() => this.changeUsuari(this.state.formularioPassword, this.state.usuari)}>Confirmar</button>
                                        </div> : null}
                                    {this.state.formularioCorreo ?
                                        <div className="posicionButtonAcceptConfirmar">
                                            <button className="button buttonAccept" onClick={() => this.changeCorreu(this.state.formularioPassword, this.state.correu)}>Confirmar</button>
                                        </div> : null}
                                    <div className="posicionButtonCancelConfirmar">
                                        <button className="button buttonCancel" onClick={() => this.cambiarEstadoFormulario(false)}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    <div className="alignContent">
                        <div id="containerlog" className="prueba" >
                            <Header userName={JSON.parse(sessionStorage.getItem("Usuari")).usuari} />
                            <Menu />
                            <div id="settingsDiv" className="background_Formularis">
                                <h1>OPCIONS</h1>
                                <div className="Container">
                                    <p>Usuari: <input id="inputUsuario" type="text" value={this.state.usuari} onChange={(e) => { this.usuarioOnChange(e) }}></input></p>
                                    {this.state.usuarioCambiado ?
                                        <div>
                                            <div className="botonesPeques BotonAcceptar" onClick={() => this.comprovarUsuari(this.state.usuari)}><AiOutlineCheck /></div>
                                            <div className="botonesPeques BotonCancelar" onClick={this.cancelUsuari}><AiOutlineClose /></div>
                                        </div>
                                        : null}
                                </div>
                                <div className="Container">
                                    <p>Correu: <input id="inputCorreu" type="text" value={this.state.correu} onChange={(e) => { this.correoOnChange(e) }}></input></p>
                                    {this.state.correoCambiado ?
                                        <div>
                                            <div className="botonesPeques BotonAcceptar" onClick={this.statusChangeCorreo}><AiOutlineCheck /></div>
                                            <div className="botonesPeques BotonCancelar" onClick={this.cancelCorreu}><AiOutlineClose /></div>
                                        </div>
                                        : null}
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
                                                <input type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }); }}></input>
                                            </div>
                                            <div className="Container">
                                                <p>Contrasenya Nova</p>
                                                <input type="password" value={this.state.newPass} onChange={(e) => { this.setState({ newPass: e.target.value }); }}></input>
                                            </div>
                                            <div className="Container">
                                                <p>Repeteix Contrasenya Nova</p>
                                                <input type="password" value={this.state.passR} onChange={(e) => { this.setState({ passR: e.target.value }); }}></input>
                                            </div>
                                        </div>
                                        <div id="posicionBotonAccept">
                                            <button className="button buttonAccept fuente" onClick={() => this.changePassword(this.state.password, this.state.newPass, this.state.passR)}>Confirmar</button>
                                        </div>
                                        <div id="posicionBotonCancel">
                                            <button className="button buttonCancel fuente" onClick={() => this.changeStat(true)}>Cancelar</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}