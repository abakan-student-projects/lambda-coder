const {Sequelize, DataTypes} = require ('sequelize')
const dotenv = require('dotenv')
resultDotENV = dotenv.config({path: './src/config/.env' })


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
        timestamps: false
    }
})

const Contestant = sequelize.define('Contestant', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true        
    },
    name: {
        type: DataTypes.STRING,        
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    codeforceId: {
        type: DataTypes.STRING,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,        
    },
    workOrEducationPlace: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
         tableName: 'Contestants'    
})

const CodeforcesResult = sequelize.define('CodeforcesResult', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    contestId: {
        type: DataTypes.INTEGER
    },
    contestName: {
        type: DataTypes.STRING
    },
    contestantId: {
        type: DataTypes.INTEGER
    },
    rank: {
        type: DataTypes.STRING
    },
    oldRating: {
        type: DataTypes.INTEGER
    },
    newRating: {
        type: DataTypes.INTEGER
    },
    contestantsCount: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    }

})

Contestant.hasMany(CodeforcesResult, {foreignKey: 'contestantId'})
CodeforcesResult.belongsTo(Contestant, {foreignKey: 'contestantId'})

module.exports.createContestant = function (contestant) {
    return Contestant.create(contestant)
}

module.exports.createCodeforcesResult = function (codeforcesResult) {
    return CodeforcesResult.create(codeforcesResult)
}

module.exports.findCodeforcesResultsOfContestant = function (id) {
    return CodeforcesResult.findAll({
        where: {
            contestantId: id
        }
    })
}

module.exports.findContestantId = function (handle) {
    return Contestant.findOne(handle)
}

module.exports.findAllContestants = function () {
    return Contestant.findAll()
}
