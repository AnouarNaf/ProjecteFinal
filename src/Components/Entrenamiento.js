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
        const res = await Axios.get("http://localhost:3001/api/numeroMonstres"); 
        this.setState({
            numeroMonstres: res.data[0].monstres
        })
        
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


    async getImgMonstre(monstreId){
        const res = await Axios.get(`http://localhost:3001/api/getImatgeMonstre/${monstreId}`); 
        this.setState({
            monstreImgBot: res.data[0].img
        })
    }

    play() {
        const min = 1;
        var max = this.state.Monstruo[0].Dany + this.state.Monstruo[0].Armadura + this.state.Monstruo[0].Esquiva - 3;
        var playerAtackBase = this.state.Monstruo[0].Dany ;
        var playerDefensaBase = this.state.Monstruo[0].Armadura ;
        var playerEsquivaBase = this.state.Monstruo[0].Esquiva ;
        var playerVidaBase = this.state.Monstruo[0].Vida ;

        var atackBot = min + Math.trunc(Math.random() * (max - min));
        max = max - atackBot;
        var defensaBot = min + Math.trunc(Math.random() * (max - min));
        var esquivaBot = max - defensaBot + 1;
        var vidaBot = this.state.Monstruo[0].Vida;

        var arrayRandom = [atackBot, defensaBot, esquivaBot];
        var indexRandom = Math.trunc(Math.random() * (3 - 1));
        atackBot = arrayRandom[indexRandom];
        arrayRandom.splice(indexRandom,1);
        indexRandom = Math.trunc(Math.random() * (2));
        defensaBot = arrayRandom[indexRandom];
        arrayRandom.splice(indexRandom,1);
        esquivaBot = arrayRandom[0];

        

        console.log("Suma Bot: " + (atackBot + defensaBot + esquivaBot) + " Max Jugador: " +  (this.state.Monstruo[0].Dany + this.state.Monstruo[0].Armadura + this.state.Monstruo[0].Esquiva));
        console.log("Valor Bot: " + atackBot + " " + defensaBot + " " + esquivaBot);

        

        
        this.getImgMonstre(Math.trunc(Math.random() * (this.state.numeroMonstres - 1) + 1));


        this.setState({
            show: false,
            randDMG : Math.round(atackBot),
            randARM : Math.round(defensaBot),
            randESQ : Math.round(esquivaBot),
            myText: 'My Original Text',
            monstre: 'monstre',
            monstreBot: 'monstreBot'
        })

        
        var ronda = 1;
        var torn = false;
        var resposta;
        var danyJugador;
        var danyBot;
        
        while (vidaBot >= 1 && playerVidaBase >= 1) {
            console.log("Ronda: " +ronda);
            this.setState({
                monstre: '',
                monstreBot: '',
            })
            
            var defensaMajorP = false; 

            if(playerEsquivaBase < playerDefensaBase) {
                defensaMajorP = true;
            }

            var defensaMajorB = false; 

            if(esquivaBot < defensaBot) {
                defensaMajorB = true;
            }

            //********* TORN = TRUE LI TOCA AL JUGADOR ***********/

            
            if(ronda == 1){
                if(Math.trunc(Math.random() * (2 - 0) + 0 ) == 1){
                    console.log("PLAYER");
                    resposta = this.joc(defensaMajorP, playerAtackBase, playerDefensaBase,playerEsquivaBase, playerVidaBase);
                    danyJugador = resposta[0];
                    playerVidaBase = resposta[1];
                    ronda = ronda + 1;

                } else {
                    console.log("BOT");
                    resposta = this.joc(defensaMajorB, atackBot, defensaBot,esquivaBot, vidaBot);
                    danyBot = resposta[0];
                    vidaBot = resposta[1];
                    torn = true;
                    ronda = ronda + 1;
                }
            } else if (torn) {
                console.log("PLAYER");
                resposta = this.joc(defensaMajorP, playerAtackBase, playerDefensaBase,playerEsquivaBase,playerVidaBase,danyBot);
                danyJugador = resposta[0];
                playerVidaBase = resposta[1];
                torn = false;
                ronda = ronda + 1;

            } else {
                console.log("BOT");
                resposta = this.joc(defensaMajorB, atackBot, defensaBot,esquivaBot,vidaBot,danyJugador);
                danyBot = resposta[0];
                vidaBot = resposta[1];
                torn = true;
                ronda = ronda + 1;
            }

            
            if (torn){
                this.setState({
                    monstre: 'monstre',
                })
            } else {
                this.setState({
                    monstreBot: 'monstreBot',
                })
            }
            
            



            

            

        }
        
    }


    joc(defensaMajor, atackBase, defensaBase, esquivaBase, vida, atackEnemic=0) {
        var dado100 = 100;
        const min = 1;
        var randAtk = (min + Math.random() * (dado100 - min));
        var esquiva = -1;
        var defensa = -1;
        var atack;

        //*********CALCULO ATAQUE************/
        if (randAtk >= 90) {
            atack = atackBase * 2;
            atack = Math.round(atack + randAtk);
        } else if (randAtk <= 10) {
            atack = 0;
        } else  {
            atack = Math.round(atackBase + randAtk);
        }      
        

        var randomDeu = Math.random() * (10);
        
        

        if(randomDeu > 3){
            if(defensaMajor){
                defensa = this.calculDefensa(defensaBase);
            } else {
                esquiva = this.calculEsquiva(esquivaBase);
            }
            
        } else {
            if(!defensaMajor){
                defensa = this.calculDefensa(defensaBase);
            } else {
                esquiva = this.calculEsquiva(esquivaBase);
            }
        }

        
        if (defensa > -1 ) {
            if (atackEnemic > defensa){
            vida = vida - (atackEnemic - defensa);
            }
        } else {
            if ( atackEnemic > esquiva) {
                vida = vida - atackEnemic;
            } 
        }
        this.setState({
            myText: vida,
        })
        console.log("Atack: " + atack);
        console.log("Esquiva: " + esquiva);
        console.log("Defensa: " + defensa);
        console.log("Vida: " + vida);
        return([atack, vida])

    }

    calculDefensa(defensaBase) {
        const min = 1;
        var defensa; 
        var dado100 = 100;
        var randDef = (min + Math.random() * (dado100 - min));
        //*********CALCULO DEFENSA************/
        if (randDef >= 90) {
            defensa = defensaBase * 2;
            defensa = Math.round(defensa + randDef);
        } else if (randDef <= 10) {
            defensa = 0;
        } else {
            defensa = Math.round(defensaBase + randDef);
        }
        return(defensa);
    }

    calculEsquiva(esquivaBase) {
        const min = 1;
        var dado120 = 120;
        var dado100 = 100;
        var dado4 = 4;
        var esquiva = (min + Math.random() * (dado4 - min));

        //*********CALCULO ESQUIVA JUGADOR ************/

        if (esquiva == dado4){
            esquiva = 0;
        } else {
            esquiva = (min + Math.random() * (dado120 - min));
            if (esquiva >= dado100){
                esquiva = 99999999;
            } else if (esquiva <= 10) {
                esquiva = 0;
            } else {
                esquiva = Math.round(esquiva + esquivaBase);
            }
        }
        return(esquiva);
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
                                <div className={this.state.monstre} id="monstresPlayer1">
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
                                {this.state.monstreImgBot ? 
                                <div className={this.state.monstreBot} id="monstresPlayer2">
                                    <img src={this.state.monstreImgBot } id="imatge2" className="imatges" alt="imatgeMonstre"></img>
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
                                : null }
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
                        { !this.state.show ?
                        <div id="estadistiques" >
                            <Container className="cont_inv">
                                
                                {this.state.myText}
                                    
                            </Container>

                        </div> : null }
                </div>
            </div>
        );
    }
}
