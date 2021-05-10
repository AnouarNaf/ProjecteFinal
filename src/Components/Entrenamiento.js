import react from "react";
import { Container, Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/Button';
import '../Styles/entrenamiento.css';

export default class Entrenamiento extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            actiu : false,
            isDisabled : true
        }
        this.cambiar = this.cambiar.bind(this);
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
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>                
                            </Row>
                            <Row className="row_inv">
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>                
                            </Row>
                            <Row className="row_inv">
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>                
                            </Row>
                            <Row className="row_inv">
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>
                                <Col className="celda" sm={4} onClick={this.cambiar}>
                                    hola
                                </Col>                
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
