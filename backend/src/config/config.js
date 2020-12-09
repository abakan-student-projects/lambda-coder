const CODEFORCES_API = 'https://codeforces.com/api/',
CF_API = {    
    API_CONTEST_STANDING: CODEFORCES_API+'contest.standings',
    API_USER_RATEDLIST: CODEFORCES_API+'user.ratedList',
    API_CONTEST_STATUS: CODEFORCES_API+'contest.status',
}


api_params = {
    contest_standing_params: {
        params : {
            contestId: 566,
            // from: 1,
            // count: 5,
            // handles: "tourist"+";"+"ecnerwala",
            //room: ,
            showUnofficial: false
        }    
    },    
    user_ratedList_params: {
        params : {
            activeOnly: true //false
        }
    },    
    contest_status: {
        params: {
            contestId: "93",
            handle: "tourist",
            from: "1",
            count: "10"
        }
    }
    
}
module.exports = {
    CF_API,
    api_params
}