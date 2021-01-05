const { delay } = require('./utils')
const axios = require('axios')

const CODEFORCES_API = 'https://codeforces.com/api/',
    CF_API = {
        API_CONTEST_STANDING: CODEFORCES_API + 'contest.standings',
        API_USER_INFO: CODEFORCES_API + 'user.info',
        API_USER_SUBMISSIONS: CODEFORCES_API + 'user.status',
        API_USER_RATING: CODEFORCES_API + 'user.rating',
        API_CONTEST_LIST: CODEFORCES_API + 'contest.list?gym=false',
    }

const getContestants = async (handles) => {
    console.log(`getContestants(${handles})`);
    await delay();
    return (await axios.get(CF_API.API_USER_INFO + '?handles=' + handles.join(';'))).data.result;
}

const getContests = async () => {
    await delay();
    return (await axios.get(CF_API.API_CONTEST_LIST)).data.result.reduce((map, c) => {
        if (c != null && c.phase == 'FINISHED') {
            map.set(c.id, c);
        }
        return map;
    }, new Map());
}

const getContestIdsByUser = async (handle) => {
    await delay();
    return Array.from((await axios.get(CF_API.API_USER_SUBMISSIONS + '?handle=' + handle)).data.result.reduce((map, c) => {
        map.set(c.contestId, c);
        return map;
    }, new Map()).keys());
}

const getUserRatings = async (handle) => {
    await delay();
    return (await axios.get(CF_API.API_USER_RATING, {
        params: {
            handle: handle,
        }
    })).data.result.reduce((map, c) => {
        map.set(c.contestId, c);
        return map;
    }, new Map());
}

const getUserRank = async (contestId, handle) => {
    await delay();
    return (await axios.get(CF_API.API_CONTEST_STANDING, {
        params: {
            contestId: contestId,
            handles: handle,
            showUnofficial: false
        }
    })).data.result?.rows[0]?.rank ?? 0;
}

const getNumberOfUserForContest = async (contestId) => {
    await delay();
    return (await axios.get(CF_API.API_CONTEST_STANDING, {
        params: {
            contestId: contestId,
            showUnofficial: false
        }
    })).data.result?.rows?.length ?? 0;
}

module.exports = {getContestants, getContests, getContestIdsByUser, getUserRank, getNumberOfUserForContest, getUserRatings}