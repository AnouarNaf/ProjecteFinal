import react from "react";
import { Container, Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/Button';
import '../Styles/Entrenamiento.css';
import Axios from "axios";
import Menu from './Menu';
import Header from './Header';

export default class Entrenamiento extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            actiu: false,
            isDisabled: true,
            show : true
        }
        this.cambiar = this.cambiar.bind(this);
        this.play = this.play.bind(this);
    }
    async componentDidMount() {
        Axios.post("http://localhost:3001/api/GetImgMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari }).then((res) => this.setState({
            imagenes: res.data.rows
        }))
    }

    cambiar(idmonstruo) {
        Axios.post("http://localhost:3001/api/GetMonstruo_info", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: idmonstruo })
        .then((res)=> this.setState({
            Monstruo: res.data.rows ,
            nivel: Math.trunc(res.data.rows[0].Punts_Gastats / 5)
         })  )
        this.setState({
            backgroundColor: "green",
            isDisabled: false

        })
    }

   
    play() {
        const min = 1;
        var max = this.state.Monstruo[0].Dany + this.state.Monstruo[0].Armadura + this.state.Monstruo[0].Esquiva - 3;
        var randDmg = min + Math.random() * (max - min);
        max = max - randDmg;
        var randArm = min + Math.random() * (max - min);
        var randEsq = max - randArm + 1;
        this.setState({
            show: false,
            randDMG : Math.round(randDmg),
            randARM : Math.round(randArm),
            randESQ : Math.round(randEsq)
        })

        
    }

    render() {
        return (
            <div className="perfil" >
                <Header />
                <Menu />
                <div className="container">
                    <div id="lista" >

                    { this.state.show ? <Button id="boto" style={{ backgroundColor: this.state.backgroundColor }} disabled={this.state.isDisabled} onClick={this.play}>PLAY</Button> : null }
                    { !this.state.show ?
                        <div>
                            {!this.state.Monstruo ?  "": 
                            <div>
                                <div id="monstresPlayer1">
                                    <Row>
                                        <img src={this.state.Monstruo[0].img } className="imatges" alt="imatgeMonstre"></img>  
                                    </Row>
                                    {/* 
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
                                     */}
                                </div>
                                <div id="monstresPlayer2">
                                    <img src={this.state.Monstruo[0].img } id="imatge2" className="imatges" alt="imatgeMonstre"></img>
                                    {/* 
                                    <Row>
                                        Nom: {this.state.Monstruo[0].Nom }   
                                    </Row>
                                    <Row>
                                        vida: {this.state.Monstruo[0].Vida }   
                                    </Row>
                                    <Row>
                                        Fuerza:   {this.state.randDMG }   
                                    </Row>
                                    <Row>
                                        Armadura:  {this.state.randARM }   
                                    </Row>
                                    <Row>
                                        Esquiva:  {this.state.randESQ }   
                                    </Row> */}   
                                </div>
                                </div>
                            }
                        </div>
                    : null }
                    </div>
                    { this.state.show ?
                        <div id="estadistiques" >
                            <Container className="cont_inv">
                                <Row className="row_inv">
                                    {!this.state.imagenes ? "" : this.state.imagenes.map((x, i) => {
                                        return (
                                            <Col className="celda" sm={4} onClick={() => this.cambiar(x.idMonstre)} key={i}> 
                                                <img src={x.img} className="imatges imatges3" alt="imatgeMonstre"></img>
                                            </Col>
                                        )
                                    })}
                                    
                                </Row>
                            </Container>

                        </div> : null }
                </div>
            </div>
        );
    }
}
