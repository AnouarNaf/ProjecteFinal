import React from 'react';
import '../Styles/profile.css';
import Inventario from './inventario';
import Menu from './Menu';

function Perfil() {


    //----------------------------------------//

    //-----------Usuario_info--------------//
    // var idusuario = "";
    const [correo, setcorreo] = React.useState(null);
    const usuario_nombre = JSON.parse(sessionStorage.getItem("Usuari")).usuari;

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
            <Menu />
            <Inventario />

            <div id="invisible_box">
            </div>

        </div>
    );
}

export default Perfil;