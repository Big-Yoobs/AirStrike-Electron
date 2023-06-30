import * as ReactDOM from 'react-dom';
import './styles/style.css';
import AppComponent from './app.component';

function render() { // load react
    ReactDOM.render(<AppComponent />, document.body);
}

render();