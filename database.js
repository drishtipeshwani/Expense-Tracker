const Pool = require('pg').Pool
const pool = new Pool({    //Add your postgres database credentials here
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});

const getData = (userId) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM public."user" where id='${userId}'`, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const createBudget = (body) => {
    return new Promise(function (resolve, reject) {
        const { userId, budget } = body
        pool.query(`INSERT INTO public."user" (id,budget) VALUES($1,$2)`, [userId, budget], (error) => {
            if (error) {
                reject(error)
            }
            resolve(`A new budget has been added`)
        })
    })
}

const updateBudget = (body) => {

    const { budget, userId } = body

    return new Promise(function (resolve, reject) {
        pool.query(`UPDATE public."user" SET budget=$1 where id='${userId}'`, [budget], (error) => {
            if (error) {
                reject(error)
            }
            resolve(`Budget has been updated for user`)
        })
    })
}

const createItem = (body) => {
    return new Promise(function (resolve, reject) {
        const { userId, budget, item, amount } = body
        pool.query(`INSERT INTO public."user" (id,budget,item,amount) VALUES($1,$2,$3,$4)`, [userId, budget, item, amount], (error) => {
            if (error) {
                reject(error)
            }
            resolve(`A new item has been added`)
        })
    })
}

module.exports = {
    getData,
    createBudget,
    updateBudget,
    createItem
}