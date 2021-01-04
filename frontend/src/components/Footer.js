import { NavLink } from "react-router-dom";

function Footer() {
    return(
        <footer>
            <div id="l-footer" className="uk-section uk-section-muted uk-section-xsmall">
                <div className="uk-container">
                    <div className="uk-text-center uk-text-small uk-first-column">
                        <p>
                            <NavLink className="uk-link-text" to="/">λ-coder</NavLink>&nbsp;|&nbsp;
                            <a className="uk-link-text" href="http://lambda-calculus.ru/">lambda-calculus</a>
                            <br/>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;