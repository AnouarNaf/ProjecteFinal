import React,{useState, useEffect} from 'react';
import './profile.css';
import Axios from "axios";
import { Container, Row, Col } from 'react-grid-system';
import dragon from './imgs/dragon.png';
function alerta(x){
    
alert("hola");
}
function leerinventario(monstruos,usuario){
    var imgs = [];
    for (var i = 0; i < monstruos.length; i++) {
        if(monstruos[i].idUsuario==usuario){

               imgs[i] = monstruos[i].img;
               
        }
        console.log(monstruos[i].idUsuario);
      }
      console.log(usuario);
    
}

function registro(x, user,password, email){
    console.log(x);
    if(x=="false"){
        alert("el usuario es correcto");
        Axios.post("http://localhost:3001/api/InsertarUsuario",{usuario: user, contraseña: password, gmail: email}).then((res)=> alerta(res.data.mensaje))
    }else{
        alert("el usuario ya existe");
    }
    }

 function Perfil() {
     //-----------Usuario_info--------------//
     const [Usaurio, setusu] = React.useState(null);
     const [UsuId, SetId] = React.useState(null);
    const [Gmail, setGmail] = React.useState(null);
    const [N_inventario, setInv] = React.useState(null);
   
   /* const [Usuario, setDataC] = React.useState(null);*/

    useEffect(() => {
        fetch("/api/usuario_logged")
            .then((res) => res.json())
            .then((data) => setusu(data.mensaje.usuario));
            /*.then ((data) =>setUsu_ID(data.id));*/
    }, []);
    useEffect(() => {
        fetch("/api/usuario_logged")
            .then((res) => res.json())
            .then((data) => SetId(data.mensaje.idUsuario)).then(console.log(2));
            /*.then ((data) =>setUsu_ID(data.id));*/
    }, []);
    
    useEffect(() => {
        fetch("/api/gmail_logged")
        .then((res) => res.json())
        .then((data) => setGmail(data.mensaje));
    }, []);
    useEffect(() => {
        fetch("/api/Monstruos_Usuarios")
        .then((res) => res.json())
        .then((data) => leerinventario(data.inventario,UsuId));
    }, []);



    return (
        <div className="perfil" >
            <div className="header">
                <div id="texto_header">
                    <b id="usu_header">{Usaurio}   {UsuId}</b>  
                    <b id="gmail_header">{Gmail}</b> 
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
        <div className="container">         
            <div id="inventario" >
                <div id="title_invent">
                    <b> {N_inventario}</b>
                </div>
                    <Container className="cont_inv">  
                        <Row className="row_inv">
                            <Col className="celda" sm={4}>
                                <img src={dragon} width="60" height="65"/> 
                            </Col>
                            <Col className="celda" sm={4}>
                           
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>                
                        </Row>
                        <Row className="row_inv">
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>                
                        </Row>
                        <Row className="row_inv">
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>                
                        </Row>
                        <Row className="row_inv">
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>
                            <Col className="celda" sm={4}>
                                hola
                            </Col>                
                        </Row>
                    </Container>                                         
            </div>
             <div id="Stats" >
                <Container>
                    <Row>
                        Inventario
                    </Row>
                    <Row>
                        Nombre_criatura
                    </Row>
                    <Row>
                       <div  id="img_prueba"> Imagen_prueba </div>
                       <div id="stats_img" >
                           <Container>
                               <Row id="desc">
                                   Monstruo de grandes garras
                               </Row>
                               <Row>
                                    Vida:  
                               </Row>
                               <Row>
                                    Fuerza:  
                               </Row>
                               <Row>
                                    Armadura:  
                               </Row>
                               <Row>
                                    Esquiva:  
                               </Row>
                           </Container>
                       </div>
                    </Row>
                    <Row>
                        <div id="nivel_puntos">
                            <Container>
                                <Row>
                                    Nivel:
                                </Row>
                                <Row>
                                    Puntos:
                                </Row>
                            </Container>

                        </div>
                    </Row>
                </Container>      
             </div>
        </div>
        <div id="invisible_box">
        
        </div>
    </div>
    );
}

export default Perfil;