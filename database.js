const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'expense-tracker',
    password: 'archie0901',
    port: 5432,
});

const getList = (userId) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT (items,budget) FROM public."user" where id='${userId}'`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

const updateBudget = (budget, userId) => {

    return new Promise(function (resolve, reject) {
        pool.query(`UPDATE public."user" SET budget=${budget} where id='${userId}'`, (error) => {
            if (error) {
                reject(error)
            }
            resolve(`Budget has been updated for user`)
        })
    })
}

const createItem = (body) => {
    return new Promise(function (resolve, reject) {
        const { name, expense } = body
        pool.query('INSERT INTO user (items) VALUES ({name:expense}) RETURNING *', [name, expense], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new item has been added added: ${results.rows[0]}`)
        })
    })
}

module.exports = {
    getList,
    updateBudget,
    createItem
}