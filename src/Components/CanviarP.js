import react from 'react';
import '../Styles/CanviarP.css';

export default class CanviarP extends react.Component {
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);        
    }
    
    cancel(){
    }
    render() {
        return (
            <div>
                <p>Canviar Component</p>
                <button className="button buttonCancel" onClick={this.cancel}>Cancel</button>
            </div>
        )
    };
}