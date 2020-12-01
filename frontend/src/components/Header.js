import { NavLink } from "react-router-dom";

function Header() {
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <NavLink className="navbar-brand" to="/">𝝺-кодер</NavLink>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user">Мой профиль <span className="sr-only">(current)</span></NavLink>
                    </li>
                </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;