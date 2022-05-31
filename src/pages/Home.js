import logo from '../assets/logo.png';
import '../style/App.css';
import { Menu } from '../components/shared/menu/Menu';

export function Home() {
    require('dotenv').config()
    return (
        <>

            <Menu />
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
        </>
    )
}