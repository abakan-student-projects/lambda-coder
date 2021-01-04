import { NavLink } from "react-router-dom";

function Header() {
    return(
        <header>
            <nav id="nav" className="uk-navbar-container uk-navbar" uk-navbar="">
            <div className="uk-navbar-left">
                <NavLink to="/" className="uk-navbar-item uk-logo">λ-coder</NavLink>
            </div>
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <li className=""><NavLink to="/contestant">Участники</NavLink></li>
                </ul>
            </div>
            </nav>
        </header>
    );
}

export default Header;