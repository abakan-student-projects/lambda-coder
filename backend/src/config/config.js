const CODEFORCES_API = 'https://codeforces.com/api/',
CF_API = {    
    API_CONTEST_STANDING: CODEFORCES_API+'contest.standings',
    API_USER_RATEDLIST: CODEFORCES_API+'user.ratedList',
}

contest_standing_params =  {
    params : {
        contestId: 566,
        from: 1,
        count: 5,
        //handles: ,
        //room: ,
        showUnofficial: true
    }    
}

const user_ratedList_params = {
    params : {
        activeOnly: true //false
    }
}

module.exports = {
    CF_API,
    contest_standing_params,
    user_ratedList_params,
}