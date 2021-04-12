function isEmpty(obj) {
    for (key in obj) {
        return false
    }
    return true
}

function isContest(obj) {
    for (key in obj) {
        for (keyobj in obj[key]) {
            if (typeof (obj[key][keyobj]) == typeof (0) && obj[key][keyobj] > null) {
                return false
            }
        }
    }
    return true
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    });
}

module.exports = { isEmpty, isContest, delay }