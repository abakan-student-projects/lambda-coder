const axios = require('axios')
const dbConnect = require('./db_connect')

const CODEFORCES_API = 'https://codeforces.com/api/',
CF_API = {    
    API_CONTEST_STANDING: CODEFORCES_API+'contest.standings',
    API_USER_INFO: CODEFORCES_API+'user.info',
    API_CONTEST_LIST: CODEFORCES_API+'contest.list?gym=false',
}

const notFoundedContests = [874,834,826,693,]

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

const countPointsOfContestants = {}

//получаем всех участников из бд
dbConnect.findAllContestants()
//записываем хэндлс участников
.then( res => {    
    const handles = []
    res.forEach(val => {
        handles.push(val.dataValues.codeforceId) 
        countPointsOfContestants[val.dataValues.id] = {
            handle: val.dataValues.codeforceId,
            contestsId: []
        }
    })
    return axios.get(CF_API.API_USER_INFO+'?handles='+handles.join(';'))
})
//записываем время регистрации
.then(res => {
    res.data.result.forEach(val  => {
        Object.keys(countPointsOfContestants).forEach(key => {
            if(val.handle == countPointsOfContestants[key].handle){
                countPointsOfContestants[key].registrationTime = val.registrationTimeSeconds                
            }
        })
    })
    return axios.get(CF_API.API_CONTEST_LIST)
})
//записываем ид мероприятий
.then(res => {
    Object.keys(countPointsOfContestants).forEach(key => {
        res.data.result.forEach(val => {
            if(countPointsOfContestants[key].registrationTime <= val.startTimeSeconds && val.phase == 'FINISHED' && !val.name.match(/Ознакомительный/i) && !val.name.match(/пробный/i)){
                countPointsOfContestants[key].contestsId.push(val.id) 
            }
        })
    })
    
    let contestantsResult = Object.keys(countPointsOfContestants).map (row => {
        console.log('row: ',row);
        return dbConnect.findCodeforcesResultsOfContestant(row)            
    })
    return Promise.all(contestantsResult)
})
//удаляем посчитанные мероприятия
.then(res => {
    Object.keys(countPointsOfContestants).forEach(key => {
        res.forEach(val => {
            val.forEach(valval => {
                if(key == valval.dataValues.contestantId) {
                    const index = countPointsOfContestants[key].contestsId.indexOf(valval.dataValues.contestId)
                    if(index || index == 0){
                        countPointsOfContestants[key].contestsId.splice(index, 1)
                    }
                }
            })
        })
        notFoundedContests.forEach(id => {
            if(countPointsOfContestants[key].contestsId.indexOf(id) || countPointsOfContestants[key].contestsId.indexOf(id) == 0){
                const index = countPointsOfContestants[key].contestsId.indexOf(id)
                countPointsOfContestants[key].contestsId.splice(index, 1)                        
            }
        })
    })
    //рекурсивная функция для подсчета очков участников
    const contestantsIds = Object.keys(countPointsOfContestants)
    let resultArrContestants = []
    function doNextContestant (index = 0) {
        if(contestantsIds.length == 0)
        return 0
        countNextContest(key=contestantsIds[index])
        .then(res => {
            resultArrContestants.push(res)
            index++
            if(index < contestantsIds.length){
                doNextContestant(index)
            } else {
                return Promise.all(resultArrContestants)
            }
        })    
        .catch(e=>console.log(e))
    }
    //рекурсивная функция для подсчета очков участника в соревновании и записи в бд
    let resultArr = []
    async function countNextContest (key, index = 0) {
        if(countPointsOfContestants[key].contestsId.length == 0)
        return 0 
        countPoints(countPointsOfContestants[key].handle, key, countPointsOfContestants[key].contestsId[index])
        .then(res => {
            resultArr.push(res)
            index++
            if(index < countPointsOfContestants[key].contestsId.length){
                countNextContest(key, index) 
            } else {
                return Promise.all(resultArr)  
            }
        })
        .catch(e=>console.log(e))
    }

    return doNextContestant()
}) 
.then(res => {
    console.log(res); //undefined?
})
.catch(e=>console.log(e))

//функция подсчета очков участника в соревновании и записи в бд
async function countPoints(handle, contestantId, contestId) {

    const codeforcesResult =  {
        contestId: contestId,
        contestName: null,
        contestantId: contestantId,
        rank: null,
        oldRating: null,
        newRating: null,
        contestantsCount: null,
        date: Date.now()            
    }

    const contest_standing_params = {
        params : {
            contestId: contestId,
            handles: handle,
            showUnofficial: false
        }    
    }    

    await axios.get(CF_API.API_CONTEST_STANDING, contest_standing_params)
    .then( (res) => {
        codeforcesResult.contestName = res.data.result.contest.name
        if (isEmpty(res.data.result.rows) || isContest(res.data.result.rows[0].problemResults)){
            //записываем в ранк нулевой результат этого участника для этого соревнования
            return codeforcesResult.rank = 0
        } else {
            //записываем в ранк место
            codeforcesResult.rank = res.data.result.rows[0].rank
            delete contest_standing_params.params.handles
            return axios.get(CF_API.API_CONTEST_STANDING, contest_standing_params)
        }
    })
    
    .then ( res => {
        if (res == 0) {
            codeforcesResult.oldRating = 0
            codeforcesResult.newRating = 0
            codeforcesResult.contestantsCount = 0
            return dbConnect.createCodeforcesResult(codeforcesResult)
        }
        codeforcesResult.rank = Math.round((1-codeforcesResult.rank/res.data.result.rows.length)*100)
        codeforcesResult.oldRating = 0
        codeforcesResult.newRating = 0
        codeforcesResult.contestantsCount = 0
        return dbConnect.createCodeforcesResult(codeforcesResult)
    })
} 