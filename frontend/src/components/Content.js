import { Route } from 'react-router-dom';
import Participants from './Participants';
import User from './User';

function Content() {
    return(
        <main role="main" class="flex-shrink-0">
            <div class="container">
                <Route exact path="/" component={Participants}/>
                <Route path="/user" component={User}/>
            </div>
        </main>
    )
}

export default Content;