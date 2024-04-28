require("dotenv").config();
let {PGUSER, PGHOST, PGPASSWORD, PGDATABASE, ENDPOINT_ID} = process.env;
const {Pool} = require("pg");

const pool = new Pool({
	user: PGUSER,
	host: PGHOST,
	database: PGDATABASE,
	password: PGPASSWORD,
	ssl: {
		require: true,
	},
	port: 5432,
});

pool.connect()
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.error("Error connecting to database", err);
	});

module.exports = pool;
