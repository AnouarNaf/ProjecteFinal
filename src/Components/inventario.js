import React from 'react';
import Axios from "axios";
import '../Styles/inventario.css';
import { Container, Row, Col } from 'react-grid-system';
class Inventario extends React.Component{
    state = {
        data: [],
        monsterid: []
    }
    sleeccion_m(idmonstruo){
        console.log(idmonstruo);
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
    imgs(){
        console.log("clic");
    }
    render(){
        return(
            <div className="container">
            <div id="inventario" >
                <div id="title_invent">
                    <b> Inventario</b>
                </div>
                <Container className="cont_inv">
                    <Row className="row_inv">
                    {!this.state.imagenes ? "Cargando" :this.state.imagenes.map((x,i) =>{
                            return(<Col onClick={() => this.sleeccion_m(x.idMonstre)} className="celda" key={i}> <img width="60px" height="60px" id="imgs_celdas"
                    src={x.img}
                        /></Col>)
                    })
                    }   
                    </Row>
                </Container>    
            </div>
            {!this.state.Monstruo ?  "Tria un Monstre": 
            <div id="Stats" >
                    <Container>
                        <Row>
                            Inventario
                    </Row>
                        <Row>
                        {this.state.Monstruo[0].Nom }   
                    </Row>
                        <Row>
                            <div id="img_prueba"> 
                                <img width="100px" height="160px" id="imgs_celdas"   src= {this.state.Monstruo[0].img }   />   </div>
                            <div id="stats_img" >
                                <Container>
                                    <Row id="desc">
                                    {this.state.Monstruo[0].Descripcio }   
                               </Row>
                                    <Row>
                                       vida: {this.state.Monstruo[0].Vida }   
                               </Row>
                                    <Row>
                                        Fuerza:   {this.state.Monstruo[0].Dany }   
                               </Row>
                                    <Row>
                                        Armadura:  {this.state.Monstruo[0].Armadura }   
                               </Row>
                                    <Row>
                                        Esquiva:  {this.state.Monstruo[0].Esquiva }   
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