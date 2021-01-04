const axios = require('axios')
const db = require('./db_connect')
const {getContestants, getContests, getContestIdsByUser, getUserRank, getNumberOfUserForContest, getUserRatings} = require("./codeforces");
const {isEmpty, isContest} = require('./utils')

const run = async () => {
    const dbContestants = (await db.findAllContestants()).reduce((map, c) => {
        map.set(c.codeforceId, c);
        return map;
    }, new Map());
    const cfContestants = await getContestants(Array.from(dbContestants.values()).map((c) => c.codeforceId));
    const contests = await getContests();

    for (const c of cfContestants) {
        console.log('Contestant: ' + c.handle);
        const userContestIds = await getContestIdsByUser(c.handle);
        const dbUserContestIds = (await db.findCodeforcesResultsOfContestant(dbContestants.get(c.handle).id)).reduce((map, r) => {
            map.set(r.contestId, true);
            return map;
        }, new Map());
        const constestIdsToCheck = userContestIds.filter(value => !dbUserContestIds.has(value));
        const ratings = await getUserRatings(c.handle);
        for (const contestId of constestIdsToCheck) {
            console.log('Contest ID: ' + contestId);
            const contest = contests.get(contestId);
            if (contest == null) continue;
            const rating = ratings.get(contestId);
            try {
                await db.createCodeforcesResult({
                    contestId: contestId,
                    contestName: contest.name,
                    contestantId: dbContestants.get(c.handle).id,
                    rank: rating?.rank ?? await getUserRank(contestId, c.handle),
                    oldRating: rating?.oldRating ?? 0,
                    newRating: rating?.newRating ?? 0,
                    contestantsCount: await getNumberOfUserForContest(contestId),
                    date: (rating != null) ? Date(rating.ratingUpdateTimeSeconds*1000) : (contest.startTimeSeconds*1000 + contest.durationSeconds*1000)
                });
            } catch (e) {
                console.log('ERROR: CONTEST ID = ' + contestId + '. ' + e);
            }
        }
    }
}

run().then(() => {
    process.exit(0);
});
