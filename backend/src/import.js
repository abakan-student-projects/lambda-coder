const axios = require('axios')
const config = require('./config/config')
const dbConnect = require('./db_connect')

let contestId = 566
let handle =  /*"Level.UP"*/ 'conflict'

function isEmpty (obj) {
    for (key in obj) {
        return false
    }
    return true
}

function isContest (obj) {
    for (key in obj){
        for (keyobj in obj[key]) {
            if ( typeof(obj[key][keyobj]) == typeof(0) && obj[key][keyobj] > null ) {
                return false
            }    
        }
        
        
    }
    return true
}

const api_params_local = {
    contest_standing_params: {
        params : {
            contestId,
            // from: 1,
            // count: 5,
            handles: handle,
            // room:,
            showUnofficial: false
        }    
    },       
}

const codeforcesResult =  {
    contestId,
    contestName: null,
    contestantId: null,
    rank: null,
    oldRating: null,
    newRating: null,
    contestantsCount: null,
    date: Date.now()            
}

dbConnect.findContestantId({where: {codeforceId: handle}})
.then ( res => {
    if (res == null || res == undefined) {
        console.log(`User with handle ${handle} does not exists`)
        return 1
    } else {
       codeforcesResult.contestantId = res.id 
    }
    return axios.get(config.CF_API.API_CONTEST_STANDING, api_params_local.contest_standing_params)
})
.then( (res) => {
    codeforcesResult.contestName = res.data.result.contest.name
      console.log('Data:', res.data);
    if (isEmpty(res.data.result.rows) || isContest(res.data.result.rows[0].problemResults)){
        //записываем в ранк нулевой результат этого участника для этого соревнования
        console.log('isEmpty, isContest: ',(isEmpty(res.data.result.rows) || isContest(res.data.result.rows[0].problemResults)));
        return codeforcesResult.rank = 0
    } else {
        //записываем в ранк место
        codeforcesResult.rank = res.data.result.rows[0].rank
        console.log('api_params_local.contest_standing_params.handles: ',api_params_local.contest_standing_params.params.handles );
        delete api_params_local.contest_standing_params.params.handles
        console.log('api_params_local.contest_standing_params (delete handles):', api_params_local.contest_standing_params);
        return axios.get(config.CF_API.API_CONTEST_STANDING, api_params_local.contest_standing_params)
    }
    })
.then ( res => {
    if (res == 0) {
        codeforcesResult.oldRating = 0
        codeforcesResult.newRating = 0
        codeforcesResult.contestantsCount = 0
        return dbConnect.createCodeforcesResult(codeforcesResult)
    }
    codeforcesResult.rank = (1-codeforcesResult.rank/res.data.result.rows.length)*100            
    codeforcesResult.oldRating = 0
    codeforcesResult.newRating = 0
    codeforcesResult.contestantsCount = 0
    return dbConnect.createCodeforcesResult(codeforcesResult)
})
.then ( res => {
    console.log(res)
} )
.catch( e => {
    error.log(e)
})
