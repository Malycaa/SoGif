const { Pool } = require('pg')

const user = process.env.PGUSER
const pasword = process.env.PGPASSWORD
const host = process.env.PGHOST
const database = process.env.PGDATABASE
const port = process.env.PGPORT


const connectionString = `postgresql://${user}:${pasword}:${port}/${database}`


const pool = new Pool({
  connectionString
})
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}