import React from 'react';
import Axios from "axios";
import '../Styles/inventario.css';
import subirnivel from '../imgs/Perfil/inventario/subirnivel.png';
import { Container, Row, Col } from 'react-grid-system';

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
            Esquiva: 0
        }
        this.boton_confirmar = this.boton_confirmar.bind(this);
    }
   

    sleeccion_m(idmonstruo){
        Axios.post("http://localhost:3001/api/GetMonstruo_info", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: idmonstruo })
        .then((res)=> this.setState({
            Monstruo: res.data.rows ,
            nivel: Math.trunc(res.data.rows[0].Punts_Gastats / 5)
         })  )
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
                                </Col>)
                    })
                    }   
                    </Row>
                </Container>    
            </div>
            {!this.state.Monstruo ?  null: 
            <div id="Stats" >
                    <Container>
                        <Row>
                           
                    </Row>
                        <Row>
                        <b  id="nombre_bicho">{this.state.Monstruo[0].Nom } </b>
                    </Row>
                        <Row>
                            <div id="img_prueba"> 
                                <img width="110px" height="150px" id="imgs_celdas_stats"   src= {this.state.Monstruo[0].img } alt="Monstruos"/>   </div>
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
                                    <Row id="desc">
                                        Descripcion
                               </Row>
                                <Row>
                                {this.state.Monstruo[0].Descripcio }    
                               
                               </Row>
                                </Container>
                                <Container className="Registre_partides">
                                <Row id="desc">
                                       Partidas Jugadas
                               </Row>
                                <Row>
                                 0 
                               </Row>
                               <Row id="desc">
                                       Partidas Ganadas
                               </Row>
                                <Row>
                                 0 
                               </Row>
                               <Row id="desc">
                                       Partidas Perdidas
                               </Row>
                                <Row>
                                 0 
                               </Row>
                             {this.state.puntos_sin_confirmar ==  0 ? null :
                              <Row id="ventana_confirmacion">
                                 {this.state.puntos_sin_confirmar} puntos sin confirmar
                                    <button onClick={this.boton_confirmar} id="boton_confirmar">Confirmar</button>
                               </Row>
                                 }
                                </Container>        
                            </div>
                        </Row>
                        <Row>
                            <div id="nivel_puntos">
                                <Container>
                                    <Row>
                                        Nivel:  {this.state.nivel}   
                                </Row>
                                    <Row>
                                        Puntos: {this.state.Monstruo[0].Punts_Actius }   
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