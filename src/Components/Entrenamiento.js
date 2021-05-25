import react from "react";
import { Container, Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/Button';
import '../Styles/Entrenamiento.css';
import Axios from "axios";
import Menu from './Menu';
import Header from './Header';
import { ProgressBar } from 'react-bootstrap';
import boton from '../imgs/Login/boton.png';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Entrenamiento extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            actiu: false,
            isDisabled: true,
            show : true,
            vidaporturno_player: 0,
            vidaporturno_bot: 0,
            showstats: 0,
            Registro:[],
            ventanafinal: 0,
            resultado: "",
            bloqueado: "",
            esquivado: "",
            critico: ""
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

   async  cambiar(idmonstruo) {
       
        this.setState({
            backgroundColor: "green",
            isDisabled: false,
            showstats: 0
        })
    }
    enseñar_stats(idmonstruo){
        Axios.post("http://localhost:3001/api/GetMonstruo_info", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: idmonstruo })
        .then((res)=> this.setState({
            Monstruo: res.data.rows ,
            nivel: Math.trunc(res.data.rows[0].Punts_Gastats / 5),
            showstats:1
         })  )
         console.log(this.state.showstats)
    }

    async getImgMonstre(monstreId){
        const res = await Axios.get(`http://localhost:3001/api/getImatgeMonstre/${monstreId}`); 
        this.setState({
            monstreImgBot: res.data[0].img_gif
        })
    }

  async  play() {
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
        this.setState({
            vidaporturno_player: playerVidaBase,
            vidaporturno_bot: vidaBot
        })
        

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
            this.state.Registro.push('RONDA: '+ronda)
           console.log(this.state.Registro);
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
                console.log("player agilidad: "+playerEsquivaBase+" bot esquiva: "+esquivaBot);
                if(playerEsquivaBase<esquivaBot){
                    console.log("PLAYER");
                    this.state.Registro.push('Jugador: ')
                    resposta = this.joc(defensaMajorP, playerAtackBase, playerDefensaBase,playerEsquivaBase, playerVidaBase);
                    danyJugador = resposta[0];
                    playerVidaBase = resposta[1];
                    ronda = ronda + 1;

                } else {
                    console.log("BOT");
                    this.state.Registro.push('BOT: '+ronda)
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
                    vidaporturno_player: playerVidaBase,
                    vidaporturno_bot: vidaBot,
                    
                })
                            await new Promise(resolve => setTimeout(resolve, 200));
                            this.setState({
                            monstrebot: 'invertir-color',
                           
                        })
                        await new Promise(resolve => setTimeout(resolve, 200));
                            this.setState({
                            monstrebot: '',
                            critico:"",
                            bloqeuado:"",
                            esquivado:""
                        })
                
                 await new Promise(resolve => setTimeout(resolve, 2000));
           
            
            } else {
               
                this.setState({
                    monstreBot: 'monstreBot',
                    vidaporturno_player: playerVidaBase,
                    vidaporturno_bot: vidaBot,
                    
                    
                })
               await new Promise(resolve => setTimeout(resolve, 200));
                 this.setState({
                    monstre: 'invertir-color',
                   
                })
                await new Promise(resolve => setTimeout(resolve, 200));
                 this.setState({
                    monstre: '',
                    critico:"",
                    bloqeuado:"",
                    esquivado:""
                })
                await new Promise(resolve => setTimeout(resolve, 2000));
              
            } 
        }
        if(vidaBot>0){
            this.setState({
                ventanafinal: 1,
                resultado: "win"
            })
               
        }else{
            this.setState({
                ventanafinal: 1,
                resultado: "losse"
            })
            
        }
        
    }
    ganabot(){
        Axios.post("http://localhost:3001/api/sumarderrota", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: this.state.Monstruo[0].idMonstre })
                this.setState({
                    show: true,
                    Registro: [],
                    ventanafinal: 0,
                resultado: 0
                })
    }
    ganajugador(){
     
            this.setState({
                show: true,
                Registro: [],
                ventanafinal: 0,
                resultado: 0
            })
            Axios.post("http://localhost:3001/api/sumarvictoria", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: this.state.Monstruo[0].idMonstre })
            Axios.post("http://localhost:3001/api/sumarpuntos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari, idmonstruo: this.state.Monstruo[0].idMonstre })

    }
   
       joc(defensaMajor, atackBase, defensaBase, esquivaBase, vida, atackEnemic=0) {
        var dado100 = 20;
        const min = 1;
        var randAtk = (min + Math.random() * (dado100 - min));
        var esquiva = -1;
        var defensa = -1;
        var atack;

        //*********CALCULO ATAQUE************/
        var set=""
        if (randAtk >= 15) {
            this.setState({
                critico: "critico"
            })
     
           
            atack = atackBase * 2;
            atack = Math.round(atack + randAtk);
        } else if (randAtk <= 3) {
            atack = 0;
        } else  {
            atack = Math.round(atackBase + randAtk);
        }      
        

        var randomDeu = Math.random() * (10);
        
        

        if(randomDeu > 3){
            if(defensaMajor){
                defensa =  this.calculDefensa(defensaBase);
            } else {
                esquiva =  this.calculEsquiva(esquivaBase);
            }
            
        } else {
            if(!defensaMajor){
                defensa =  this.calculDefensa(defensaBase);
            } else {
                esquiva =  this.calculEsquiva(esquivaBase);
            }
        }

        
        if (defensa > -1 ) {
            if (atackEnemic > defensa){
            vida = vida - (atackEnemic - defensa);
            }else{
                this.setState({
                    bloqeuado: "bloq"
                })
            }
        } else {
            if ( atackEnemic > esquiva) {
                vida = vida - atackEnemic;
            } else{
                this.setState({
                    esquivado: "bloq"
                })
            }
        }
        this.setState({
            myText: vida,
        })
        console.log("Atack: " + atack);
        this.state.Registro.push('Ataque: '+atack)
        console.log("Esquiva: " + esquiva);
        this.state.Registro.push('Esquiva: '+esquiva)
        console.log("Defensa: " + defensa);
        this.state.Registro.push('Defensa: '+defensa)
        console.log("Vida: " + vida);
        return([atack, vida])

    }

    calculDefensa(defensaBase) {
        const min = 1;
        var defensa; 
        var dado100 = 20;
        var randDef = (min + Math.random() * (dado100 - min));
        //*********CALCULO DEFENSA************/
        if (randDef >= 15) {
            defensa = defensaBase * 2;
            defensa = Math.round(defensa + randDef);
        } else if (randDef <= 3) {
            defensa = 0;
        } else {
            defensa = Math.round(defensaBase + randDef);
        }
        return(defensa);
    }

     calculEsquiva(esquivaBase) {
        const min = 1;
        var dado120 = 30;
        var dado4 = 4;
        var esquiva = (min + Math.random() * (dado4 - min));

        //*********CALCULO ESQUIVA JUGADOR ************/

        if (esquiva == dado4){
            esquiva = 0;
        } else {
            esquiva = (min + Math.random() * (dado120 - min));
            if (esquiva >= 25){
                esquiva = 99999999;
            } else if (esquiva <= 5) {
                esquiva = 0;
            } else {
                esquiva = Math.round(esquiva + esquivaBase);
            }
        }
        return(esquiva);
    }

    render() {
        return (
            
            <div id="todo">
             
             <div className="clouds"></div>
                <div className="fogContainer">
                    <div className="fog">  
                    </div>
            <div className="perfil" >
                <Header userName={JSON.parse(sessionStorage.getItem("Usuari")).usuari}/>
                <Menu />
                <div className="container">

                    <div id="lista" >

                    { this.state.show ? <Button id="boto" style={{ backgroundColor: this.state.backgroundColor }} disabled={this.state.isDisabled} onClick={this.play}>PLAY</Button> : null }
                    { !this.state.show ?
                        <div>
                           
                            {!this.state.Monstruo ?  "": 
                            <div>
                                <progress id="barra_jugador" value={this.state.vidaporturno_player} max={this.state.Monstruo[0].Vida}/>
                               

                                <div className={this.state.monstre} id="monstresPlayer1">
                                   
                                    <Row> 
                                    <b ID="nom"> {this.state.Monstruo[0].Nombre_Perso == "" ||this.state.Monstruo[0].Nombre_Perso == null ? "Monstruo" : this.state.Monstruo[0].Nombre_Perso}</b>
                                        <img src={this.state.Monstruo[0].img_gif } className="imatges" alt="imatgeMonstre"></img>  
                                    
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
                                <div>
                                    <progress id="barra_bot"value={this.state.vidaporturno_bot} max={this.state.Monstruo[0].Vida}/>
                                    <div className={this.state.monstreBot} id="monstresPlayer2">

                                    <Row>
                                    <img src={this.state.monstreImgBot } id="imatge2" className="imatges" alt="imatgeMonstre"></img>
                                    </Row>
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
                                </div></div>
                                : null }
                                </div>
                            }
                            <div id="narrador">
                           {!this.state.bloqueado == ""?  <b ID="bloqueado">Bloqueado </b>: null} 
                           {!this.state.esquivado == ""?  <b id="esquivado">Esquivado </b>: null} 
                           {!this.state.critico == ""?  <b id="critico">CRITICO!</b>: null} 
                           </div>
                        </div>
                    : null }
                    </div>
                    { this.state.show ?
                        <div id="estadistiques2" >

                     
                            <Container id="cont_ent" className="cont_inv">
                                <Row id="row_ent">
                                 <Row>  {!this.state.imagenes ? "" : this.state.imagenes.map((x, i) => {
                                        return (
                                            <Row id="celda" sm={4} onClick={() => this.enseñar_stats(x.idMonstre)} key={i}> 
                                              
                                               
                                            <img  src={x.img} className="imatges imatges3" alt="imatgeMonstre"></img>
                                            <b id="text_ent_nom">{x.Nom}</b>
                                              
                                            </Row>
                                          
                                        )
                                    })}
                                   </Row>  
                                 
                                </Row>
                            </Container>
                            {this.state.showstats == 0 ? null :<div id="stats">
                               
                               <div id="cuadro_Txt"> 
                               <Row id="separador">
                                      ---------------
                                    </Row>
                               <Row id="txt_sta">
                                       Nombre - <b ID="nom"> {this.state.Monstruo[0].Nombre_Perso == "" ||this.state.Monstruo[0].Nombre_Perso == null ? "Monstruo" : this.state.Monstruo[0].Nombre_Perso}</b>
                                    </Row>
                                    <Row id="txt_sta">
                                     Nivel - <b id="nivel">{ Math.trunc(this.state.Monstruo[0].Punts_Gastats / 5)}</b>
                                    </Row>
                                    <Row id="separador">
                                      ---------------
                                    </Row>
                                    <Row id="txt_sta">
                                        Vida - <b id="vida">{ Math.trunc(this.state.Monstruo[0].Vida)}</b>
                                    </Row>
                                    <Row id="txt_sta">
                                        Daño - <b id="daño">{ Math.trunc(this.state.Monstruo[0].Dany)}</b>
                                    </Row>
                                    <Row id="txt_sta">
                                        Armadura - <b id="armadura">{ Math.trunc(this.state.Monstruo[0].Armadura)}</b>
                                    </Row>
                                    <Row id="txt_sta">
                                        Esquiva - <b id="esquiva">{ Math.trunc(this.state.Monstruo[0].Esquiva)}</b>
                                    </Row>
                                    <Row >
                                     <img onClick={() => this.cambiar(this.state.Monstruo[0].idMonstre)} id="boton_j" with="50%" src={boton}></img>
                                    </Row>
                                 </div>
                                              </div>  }
                        </div> : null }
                        { !this.state.show == true ?
                        <div id="pantalla_registro" >
                      
                            <Row>
                             <Col> Vida Jugador -  {this.state.vidaporturno_player}</Col>
                             <Col> Vida Bot -  {this.state.vidaporturno_bot}</Col>
                             </Row>
                             <Row>
                                 <div id="registro_texto" >
                                 {!this.state.Registro ? "" : this.state.Registro.map((x, i) => {
                                        return (
                                       
                                               <div className="regtxt"> {x} </div>
                                         
                                        )
                                 })}
                                 </div>
                             </Row>
                       </div> : null
                       }
                        {this.state.resultado == 0 ?  null:  <div id="Capsula_fin_Partida"> {this.state.resultado == "win" ? <div ><button button onClick={() => this.ganabot()} >PERDISTE!</button></div> :<div>< button onClick={() => this.ganajugador()} >GANASTE!</button></div>}
                            </div>
                              }
                </div>
            </div>
            </div>
            </div>
        );
    }
}
