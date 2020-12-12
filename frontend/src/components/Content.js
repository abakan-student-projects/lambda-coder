import { Route } from 'react-router-dom';
import Participants from './Participants';
import Contestant from './Contestant'

function Content() {
    return(
        <main>
            <div id="l-content" className="uk-section uk-section-large uk-section-muted">
                <div className="uk-container">
                    <div className="container">
                        <Route exact path="/" component={Participants}/>
                        <Route path="/contestant" component={Contestant}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Content;