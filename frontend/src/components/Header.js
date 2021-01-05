import {NavLink} from "react-router-dom";

function Header() {
    return (
        <nav id="nav" className="uk-navbar-container uk-navbar" data-uk-navbar="">
            <div className="uk-navbar-left">
                <NavLink to="/" className="uk-navbar-item uk-logo uk-margin-left">Марафон λ-кодер</NavLink>
            </div>
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <li><a href="https://forms.gle/8pdyW43HtAGNzsWH8">Участвовать</a></li>
                </ul>
            </div>
            <div className="uk-navbar-right uk-margin-right">
                <ul className="uk-navbar-nav">
                    <li><a href="https://codeforces.com/contests?locale=ru">Расписание</a></li>
                    <li><a href="http://lambda-calculus.ru/blog/events/187.html">О марафоне</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;