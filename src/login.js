import React from 'react';
import './login.css';
import 'react-bootstrap';

function Login() {
    const x = "";
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
    <div id="contenido"  class="container">
        <div id="tablero">
            <div id="formulario2"  class="  row habilidades justify-content-md-center ">
                <div class="row" >
                    <h2>Login</h2>
                </div>
                <div class="col list ">
                    <div>
                        <h6>Usuario</h6>
                    </div>
                    <div><input type="text" id="nombreusuario_log"/></div>
                </div>
                <div class="col list ">
                    <div>
                        <h6>Contraseña</h6>
                    </div>

                    <div><input type="password" id="contraseña_log"/></div>
                </div>
                <button onclick="iniciarsesion()">Entrar</button>
            </div>
            <div>
           <p> {!data ? "Loading..." : data}</p>
            </div>
        </div>
    </div>
    );
}

export default Login;