const axios = require('axios')
const config = require('./config/config')
const dbConnect = require('./db_connect')


axios.get(config.CF_API.API_CONTEST_STANDING, config.contest_standing_params)
    .then( (res) => {
        console.log(res);
    })
    .catch( e => console.error(e))

contestant = {
    name: 'Alex',
    lastname: 'Leo',
    codeforceId: '123456791',
    active: false,
    workOrEducationPlace: 'KHSU'    
}

dbConnect.createContestant(contestant)
    .then( res => {
        console.log(res);
    })
    .catch( e => {
        console.error(e);
    })