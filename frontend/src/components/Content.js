import {Route, useHistory} from 'react-router-dom';
import Contestants from './Contestants';
import Contestant from './Contestant'

function Content() {
    return(
        <div className="uk-container uk-margin-large-top">
            <Route exact path="/" component={Contestants}/>
            <Route path="/leaderboard/:month" component={Contestants}/>
            <Route path="/contestant/:id" component={Contestant}/>
        </div>
    )
}

export default Content;