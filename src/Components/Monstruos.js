import React from 'react';
import Axios from "axios";

class Monstruos extends React.Component{
    state = {
        dataSelection: []
    }
    async componentDidMount(){
        Axios.post("http://localhost:3001/api/GetMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari }).then((res) => this.setState({data:res.data.rows}));
        var x = await Axios.post("http://localhost:3001/api/GetImgMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari });
        console.log(x);
    }
    render(){
        return(
        <div>
            {!this.state.data ? "Cargando" :this.state.data.map(x =>{
                return(<p>
                    {x.Daño}
                </p>)
            })
            }
        </div>)
    }
}

export default Monstruos;