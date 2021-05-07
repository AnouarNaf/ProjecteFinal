import React from 'react';
import Axios from "axios";

class Monstruos extends React.Component{
    state = {
        dataSelection: []
    }
    componentDidMount(){
        Axios.post("http://localhost:3001/api/GetMonstruos", { usuario: JSON.parse(sessionStorage.getItem("Usuari")).usuari }).then((res) => this.setState({data:res.data.rows}));
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