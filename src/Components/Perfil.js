import React, { useEffect } from 'react';
import '../Styles/profile.css';
import Axios from "axios";
import { Container, Row, Col } from 'react-grid-system';
import Inventario from './inventario';


function Perfil() {
    //------------Functions..................//
    // function identificarusu(x) {
    //     console.log(x[2].idUsuario)
    //     for (var i = 0; i < x.length; i++) {
    //         if (x[i].usuario === usuario_nombre) {
    //             console.log(x[i].idUsuario);
    //             idusuario = x[i].idUsuario;
    //             setcorreo(x[i].gmail);
    //             console.log(correo);
    //             break;
    //         }
    //     }
    // }


    //----------------------------------------//

    //-----------Usuario_info--------------//
    // var idusuario = "";
    const [correo, setcorreo] = React.useState(null);
    const usuario_nombre = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
    const [usuarios, setusu] = React.useState(null);
    const [UsuId, SetId] = React.useState(null);

    const [N_inventario, setInv] = React.useState(null);

    const [Prueba, setPrueba] = React.useState(null);

    /* const [Usuario, setDataC] = React.useState(null);*/


    // useEffect(() => {
    //     fetch("/api/usuario_logged")
    //         .then((res) => res.json())
    //         .then((data) => identificarusu(data.mensaje));
    //     /*.then ((data) =>setUsu_ID(data.id));*/
    // }, []);

    // useEffect(() => {
    //     fetch("/api/Monstruos_Usuarios")
    //         .then((res) => res.json())
    //         .then((data) => leerinventario(data.inventario));
    // }, []);

    // useEffect(() => {
    //         // Axios.post("http://localhost:3001/api/GetMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari}).then((res) => console.log('MonstruosUSUARIO', res.data.rows))
    //         Axios.post("http://localhost:3001/api/GetMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari}).then((res) => setPrueba(res.data.rows))
    // });


    return (
        <div className="perfil" >            
            <div className="header">
                <div id="texto_header">
                    <b id="usu_header">{usuario_nombre}</b>
                    <b id="gmail_header">{correo}</b>
                    <b id="monster_header">Monstruos</b>
                    <b id="titulo">Bestiario</b>
                </div>
            </div>
            <div id="submenu">
                <div id="boton_menu">
                    <b className="boton">Perfil</b>
                    <b className="boton">Pvp</b>
                    <b className="boton">Entrenamiento</b>
                    <b className="boton"></b>
                </div>
            </div>
            <Inventario />

            <div id="invisible_box">
            </div>

        </div>
    );
}

export default Perfil;