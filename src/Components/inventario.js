import React from 'react';
import Axios from "axios";
import '../Styles/inventario.css';
import subirnivel from '../imgs/Perfil/inventario/subirnivel.png';
import { Container, Row, Col } from 'react-grid-system';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import {AiFillDelete} from "react-icons/ai";
import {AiFillCloseCircle} from "react-icons/ai";
import liga_0 from '../imgs/MEDALLAS/Liga_0.png';
import liga_1 from '../imgs/MEDALLAS/liga_1.png';
import liga_2 from '../imgs/MEDALLAS/liga_2.png';
import liga_3 from '../imgs/MEDALLAS/Liga_3.png';
import liga_4 from '../imgs/MEDALLAS/Liga_4.png';
import liga_5 from '../imgs/MEDALLAS/Liga_5.png';

var idmonstrx="";
var puntos_sin_confirmar=0;

class Inventario extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            monsterid: [],
            puntos_sin_confirmar: 0,
            Fuerza: 0,
            Vida: 0,
            Armadura: 0,
            Esquiva: 0,
            pestaña_nombre: false,
            nuevonombre: "Monstre",
            value:"",
            Liga: 0,
            sacrificar: 0
        }
        this.boton_confirmar = this.boton_confirmar.bind(this);
    }
   

   async sleeccion_m(idmonstruo){
    this.setState({
        puntos_sin_confirmar: 0,
        Fuerza: 0,
            Vida: 0,
            Armadura: 0,
            Esquiva: 0
    })
        Axios.post("http://localhost:3001/api/GetMonstruo_info", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: idmonstruo })
        .then((res)=> this.setState({
            Monstruo: res.data.rows ,
            nivel: Math.trunc(res.data.rows[0].Punts_Gastats / 5)
         })).then((res)=>this.cargarliga())
        
             
    }
cargarliga(){
    if( Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)>90)){      
        this.setState({
            Liga: 5
        })
    }
    else if( Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)>80)){
            this.setState({
                Liga: 4
            })}
    else if( Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)>60)){
                this.setState({
                    Liga: 3
                })}
    else if( Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)>45)){
                    this.setState({
                        Liga: 2
                    })}
    else if( Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)>30)){
                        this.setState({
                            Liga: 1
                        })
    }else{
        this.setState({
             Liga: 0
             })
             if(this.state.Monstruo[0].wins==0&&this.state.Monstruo[0].losses==0){
                
             }
                        
                    }
                
            

     
     console.log(this.state.Liga);
}
boton_confirmar(){
    // this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius- this.state.puntos_sin_confirmar;
   
    Axios.post("http://localhost:3001/api/cambiar_stats", { usuario: JSON.parse(sessionStorage.getItem("Usuari"))
    .usuari, idMonstre: this.state.Monstruo[0].idMonstre, Dany: this.state.Monstruo[0].Dany,
     Vida: this.state.Monstruo[0].Vida, 
     Armadura: this.state.Monstruo[0].Armadura, 
     Esquiva: this.state.Monstruo[0].Esquiva ,
     PuntosActivos: this.state.Monstruo[0].Punts_Actius,
     PuntosGastados: this.state.Monstruo[0].Punts_Gastats
    }).then((res)=>this.setState({  
                Monstruo: this.state.Monstruo,
                Fuerza: 0,
                Armadura: 0,
                Esquiva: 0,
                Vida: 0,
                puntos_sin_confirmar: 0,
                nivel: Math.trunc(this.state.Monstruo[0].Punts_Gastats / 5)
            
      }) )

}

 subir_stadisticas(estadistica){

     switch(estadistica){
         case "Fuerza": 
            this.state.Fuerza = this.state.Fuerza+1;
            this.state.Monstruo[0].Dany = this.state.Monstruo[0].Dany+1;
            this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats+1;
         break;
         case "Esquiva":
            this.state.Esquiva = this.state.Esquiva+1;
            this.state.Monstruo[0].Esquiva = this.state.Monstruo[0].Esquiva+1;
            this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats+1;
         break;
         case "Vida":
            this.state.Vida = this.state.Vida+1;  
            this.state.Monstruo[0].Vida = this.state.Monstruo[0].Vida+1;
            this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats+1;
         break;
         case "Armadura":
            this.state.Armadura = this.state.Armadura+1; 
            this.state.Monstruo[0].Armadura = this.state.Monstruo[0].Armadura+1;
            this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats+1;
         break;

     }
    
    
    this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius-1;
     this.setState({
         Monstruo: this.state.Monstruo,
        Fuerza: this.state.Fuerza,
        Vida: this.state.Vida,
        Esquiva: this.state.Esquiva,
        Armadura: this.state.Armadura
     })
    this.state.puntos_sin_confirmar = this.state.puntos_sin_confirmar+1;
    }
    bajar_stadisticas(estadistica){
      switch(estadistica){
                case "Fuerza":
                    if(this.state.Fuerza > 0){
                        this.state.Fuerza = this.state.Fuerza-1;
                        this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats-1;
                        this.state.Monstruo[0].Dany = this.state.Monstruo[0].Dany-1
                        this.state.puntos_sin_confirmar = this.state.puntos_sin_confirmar-1;
                        this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius+1;
                    };
                break;
                case "Esquiva":
                    if(this.state.Esquiva > 0){
                        this.state.Esquiva = this.state.Esquiva-1;
                        this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats-1;
                        this.state.Monstruo[0].Esquiva = this.state.Monstruo[0].Esquiva-1;
                        this.state.puntos_sin_confirmar = this.state.puntos_sin_confirmar-1;
                        this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius+1;
                    }
                break;
                case "Vida":
                    if(this.state.Vida > 0){
                        this.state.Vida = this.state.Vida-1;
                        this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats-1;
                        this.state.Monstruo[0].Vida = this.state.Monstruo[0].Vida-1;
                        this.state.puntos_sin_confirmar = this.state.puntos_sin_confirmar-1;
                        this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius+1;
                    }
                break;
                case "Armadura":
                    if(this.state.Armadura > 0){
                        this.state.Armadura = this.state.Armadura-1;
                        this.state.Monstruo[0].Punts_Gastats = this.state.Monstruo[0].Punts_Gastats-1;
                        this.state.Monstruo[0].Armadura = this.state.Monstruo[0].Armadura-1;
                        this.state.puntos_sin_confirmar = this.state.puntos_sin_confirmar-1;
                        this.state.Monstruo[0].Punts_Actius = this.state.Monstruo[0].Punts_Actius+1;
                    }
                    break;
            }
        
      
        this.setState({
            Monstruo: this.state.Monstruo,
            Fuerza: this.state.Fuerza,
            Vida: this.state.Vida,
            Esquiva: this.state.Esquiva,
            Armadura: this.state.Armadura  
        })
       
    }
       
 
   async componentDidMount(){
    //    const x = await Axios.post("http://localhost:3001/api/GetMonstruos2", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari })
    //     console.log(x);
        Axios.post("http://localhost:3001/api/GetImgMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari }).then((res)=>this.setState({
            imagenes: res.data.rows
            
        }))
       
    }
    ventanacambiarnomnbre(){
        if(this.state.pestaña_nombre == 0){
            this.state.pestaña_nombre = 1;
        }else{
            this.state.pestaña_nombre  = 0;
        }
        this.setState({  
            pestaña_nombre: this.state.pestaña_nombre
        })
        }
    
    handleChange=(e)=>{
        this.setState({value:e.target.value})
      
      }
      confirmarcontraseña=(e)=>{
        this.setState({value:e.target.value})
     
      }
     async sacrificar(){
        const respuesta =  await Axios.post("http://localhost:3001/api/validarUsuario", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, contraseña: this.state.value })
        if( respuesta.data.mensaje == "True"){
           
           var x = await Axios.post("http://localhost:3001/api/contadormonstres", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari});
            if(x.data.mensaje=="True"){
                alert(this.state.Monstruo[0].Nombre_Perso+" ha sido sacrificado")
                    Axios.post("http://localhost:3001/api/eliminarmonstre", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, monstruo: this.state.Monstruo[0].idMonstre })
                    this.setState({sacrificar:0})
                    window.location.reload(true);
            }else{
                alert("No pots eliminar el teu ultim Monstre");
                this.setState({sacrificar:0})
            }
        }else{
            alert(respuesta.data.mensaje)
        }
        this.setState({sacrificar:0})
      }

      salirsacrifcar(){
        this.setState({sacrificar:0})
      }

      ventanaeliminar(){
        this.setState({sacrificar: 1})
      }

   async  cambiar(){
         
         this.setState({
             nuevonombre:this.state.value})
             console.log(this.state.nuevonombre);
             this.state.pestaña_nombre  = 0;
             Axios.post("http://localhost:3001/api/cambiar_nombre", 
             { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, Monstre: this.state.Monstruo[0].idMonstre, nuevonombre: this.state.value}).then((res)=>this.setState({
         
            
        }))
       
      }
    
    render(){
        return(
            <div className="container">
            <div id="inventario_1" >
                <div id="title_invent">
                    <b> </b>
                </div>
                <Container className="cont_inv">
                    <Row className="row_inv">
                    {!this.state.imagenes ? "Cargando" :this.state.imagenes.map((x,i) =>{
                            return(<Col onClick={() => this.sleeccion_m(x.idMonstre)} className="celda" key={i}>
                                <img width="97px" height="111px" id="imgs_celdas" src={x.img} alt="Monstruos"/>
                                <AiFillDelete className="AiFillDelete" onClick={() => this.ventanaeliminar()}/>
                                </Col>)
                    })
                    }   
                    </Row>
                    {this.state.sacrificar == 1 ?  <div id="ventanaconfirmacion">
                    <b>Para sacrificar a la criatura Confirma tu Contraseña</b>
                   <input type="password" value={this.state.value} onChange={this.confirmarcontraseña} />
                   <AiFillDelete onClick={() => this.sacrificar()}/>
                   <AiFillCloseCircle onClick={() => this.salirsacrifcar()}/>
                </div>:null} 
                </Container>    
            </div>
            {!this.state.Monstruo ?  null: 
            <div id="Stats" >
                    <Container>
                        <Row>
                           
                    </Row>
                    {this.state.pestaña_nombre ==  false ? 
                    <div>  
                        {this.state.Monstruo[0].Nombre_Perso ==  null ? "Monstre" : this.state.Monstruo[0].Nombre_Perso}  
                        <AiFillEdit className="AiFillEdit" onClick={() => this.ventanacambiarnomnbre()}/> </div>:
                     <div id="cambiar_nombre">
                  
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <AiOutlineUpload className="AiOutlineUpload" onClick={() => this.cambiar()}/>
                   
                    </div>}
                        <Row>
                        <Col>
                        <b  id="nombre_bicho">{this.state.Monstruo[0].Nom } </b>
                        </Col>
                        <Col>
                        
                        </Col>
                    </Row>
                        <Row>
                            <div id="img_prueba"> 
                            {this.state.Monstruo[0].img_gif ==  null ? <img width="110px" height="150px" id="imgs_celdas_stats"   src= {this.state.Monstruo[0].img } alt="Monstruos"/> 
                            :<img width="110px" height="150px" id="imgs_celdas_stats"   src= {this.state.Monstruo[0].img_gif } alt="Monstruos"/> }  </div>
                            <div id="stats_img" >
                                <Container>
                                    <Row id="desc">
                                   Estadisticas
                               </Row>
                                    <Row>
                                       vida: {this.state.Monstruo[0].Vida }  
                                       {this.state.Monstruo[0].Punts_Actius ==  0 ? null :
                                       <button href="#" onClick={() => this.subir_stadisticas("Vida")}>+</button>} 
                                        {this.state.Vida != 0 ? <button href="#" onClick={() => this.bajar_stadisticas("Vida")}>-</button>: null}
                                      
                               </Row>
                                    <Row>
                                        Fuerza:   {this.state.Monstruo[0].Dany }  
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :
                                        <button href="#"  onClick={() => this.subir_stadisticas("Fuerza")}>+</button>}
                                         {this.state.Fuerza != 0 ? <button href="#" onClick={() => this.bajar_stadisticas("Fuerza")}>-</button>: null}
                               </Row>
                                    <Row>
                                        Armadura:  {this.state.Monstruo[0].Armadura }
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :
                                        <button href="#" onClick={() => this.subir_stadisticas("Armadura")}>+</button>}
                                        {this.state.Armadura != 0 ? <button href="#" onClick={() => this.bajar_stadisticas("Armadura")}>-</button>: null}
                               </Row>
                                    <Row>
                                        Esquiva:  {this.state.Monstruo[0].Esquiva } 
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :
                                        <button href="#" onClick={() => this.subir_stadisticas("Esquiva")}>+</button>}
                                      {this.state.Esquiva != 0 ? <button href="#" onClick={() => this.bajar_stadisticas("Esquiva")}>-</button>: null}
                               </Row>
                                </Container>
                                <Container className="descripcion_stats">
                             
                                </Container>
                                <Container className="Registre_partides">
                                <Row id="desc">
                                       Partidas Jugadas
                               </Row>
                                <Row>
                                 {this.state.Monstruo[0].wins+this.state.Monstruo[0].losses}
                               </Row>
                               <Row id="desc">
                                       Partidas Ganadas
                               </Row>
                                <Row>
                                {this.state.Monstruo[0].wins}
                               </Row>
                               <Row id="desc">
                                       Partidas Perdidas
                               </Row>
                                <Row>
                                {this.state.Monstruo[0].losses}
                               </Row>
                             {this.state.puntos_sin_confirmar ==  0 ? null :
                              <Row id="ventana_confirmacion">
                                 {this.state.puntos_sin_confirmar} puntos sense confirmar
                                    <button onClick={this.boton_confirmar} id="boton_confirmar">Confirmar</button>
                               </Row>
                                 }
                                 
                                 
                                </Container>
                                <Container className="winrate_box">
                                  
                                    <Row>
                                        
                                     </Row>
                                   
                                </Container>
                          
                            </div>
                        </Row>
                        <Row>
                            <div id="nivel_puntos">
                                <Container>
                                <Row>
                                    <Col>
                                        Nivel:  {this.state.nivel}    
                                        </Col>
                                        <Col>
                                         Puntos: {this.state.Monstruo[0].Punts_Actius }   
                                         </Col>
                                    <Col>
                                        <div id="Cuadro_winrate">
                                            <Container id="txt_cuadrowin">
                                                <Row> Liga - Division {this.state.Liga}</Row>
                                                <Row>Winrate - {(this.state.Monstruo[0].wins+this.state.Monstruo[0].losses) == 0 ? 0:Math.trunc(this.state.Monstruo[0].wins*100/(this.state.Monstruo[0].losses+this.state.Monstruo[0].wins)) } % </Row>
                                                <Row> 
                                                    {this.state.Liga ==  0 ? <div><img  className="medalla" src={liga_0}/> {console.log(this.state.Liga)}</div>: null} 
                                                    {this.state.Liga ==  1 ? <div><img className="medalla" src={liga_1}/> {console.log(this.state.Liga)}</div>: null}
                                                    {this.state.Liga ==  2 ? <div><img className="medalla" src={liga_2}/> {console.log(this.state.Liga)}</div>: null}
                                                    {this.state.Liga ==  3 ? <div><img className="medalla" src={liga_3}/> {console.log(this.state.Liga)}</div>: null}
                                                    {this.state.Liga ==  4 ? <div><img className="medalla" src={liga_4}/> {console.log(this.state.Liga)}</div>: null}
                                                    {this.state.Liga ==  5 ? <div><img className="medalla" src={liga_5}/> {console.log(this.state.Liga)}</div>: null}
                                                </Row>
                                            </Container>
                                           
                                        </div>
                                    </Col>
                                </Row>
                                </Container>

                            </div>
                        </Row>
                    </Container>
                   
                </div>
              } 
              
        </div>
       
        
        )
    }
}

export default Inventario;