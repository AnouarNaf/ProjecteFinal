import React from 'react';
import Axios from "axios";
import '../Styles/inventario.css';
import subirnivel from '../imgs/Perfil/inventario/subirnivel.png';
import { Container, Row, Col } from 'react-grid-system';
class Inventario extends React.Component{
    state = {
        data: [],
        monsterid: []
    }
    sleeccion_m(idmonstruo){
        Axios.post("http://localhost:3001/api/GetMonstruo_info", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: idmonstruo })
        .then((res)=> this.setState({
            Monstruo: res.data.rows ,
            nivel: Math.trunc(res.data.rows[0].Punts_Gastats / 5)
         })  )
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
                        <b id="nombre_bicho">{this.state.Monstruo[0].Nom } </b>
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
                                       {this.state.Monstruo[0].Punts_Actius ==  0 ? null :<img className="subnivel" src={subirnivel}/>}
                               </Row>
                                    <Row>
                                        Fuerza:   {this.state.Monstruo[0].Dany }  
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :<img className="subnivel" src={subirnivel}/>}
                               </Row>
                                    <Row>
                                        Armadura:  {this.state.Monstruo[0].Armadura }
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :<img className="subnivel" src={subirnivel}/>}
                               </Row>
                                    <Row>
                                        Esquiva:  {this.state.Monstruo[0].Esquiva } 
                                        {this.state.Monstruo[0].Punts_Actius ==  0 ? null :<img className="subnivel" src={subirnivel}/>}
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
                                </Container>        
                            </div>
                        </Row>
                        <Row>
                            <div id="nivel_puntos">
                                <Container>
                                    <Row>
                                        Nivel:  {this.state.nivel }   
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