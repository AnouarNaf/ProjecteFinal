import react from "react";
import { Container, Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/Button';
import '../Styles/Entrenamiento.css';
import axios from "axios";

export default class Entrenamiento extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            actiu : false,
            isDisabled : true
        }
        this.cambiar = this.cambiar.bind(this);
    }
    async componentDidMount() {
        axios.post("http://localhost:3001/api/GetImgMonstruos", {usuario : JSON.parse(sessionStorage.getItem("Usuari")).usuari }).then((res)=>this.setState({
            imagenes : res.data.rows
        }))
    }
    
    cambiar() {
        this.setState({
            backgroundColor : "green",
            isDisabled: false
            
        })
    }
    render() {
        return (
            <div className="perfil" >
                <div className="header">
                    <div id="texto_header">
                        <b id="usu_header">{}</b>  
                        <b id="gmail_header">{}</b> 
                        <b id="monster_header">Monstruos</b>
                        <b id="titulo">Bestiario</b>            
                    </div>                       
                </div>
                <div id="submenu">
                    <div id="boton_menu">
                        <b className="boton">Perfil</b>
                        <b className="boton">Pvp</b>
                        <b className="boton" onClick="entrenamiento()">Entrenamiento</b>
                        <b className="boton"></b>
                    </div>
                </div>
                <div className="container">         
                    <div id="inventario" >

                        <Button id="boto" style={{backgroundColor: this.state.backgroundColor}} disabled={this.state.isDisabled}>PLAY</Button>
                                                            
                    </div>
                    <div id="Stats" >
                        <Container className="cont_inv">  
                            <Row className="row_inv">
                                { !this.state.imagenes ? "" : this.state.imagenes.map((x,i) =>{
                                    return(
                                        <Col className="celda" sm={4} onClick={this.cambiar}>
                                            <img src={x.img} className="imatges"></img>
                                        </Col>    
                                    )
                                })}
                            </Row>
                        </Container> 
                          
                    </div>
                </div>
                <div id="invisible_box">
                
                </div>
            </div>
        );
    }
}
