const pool = require("../db/db.pool");

exports.getAllUsers = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM users");

		res.status(200).json(response.rows);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

exports.getUserById = async (req, res) => {
	try {
		const {id} = req.params;
		const response = await pool.query(
			"SELECT * FROM users WHERE npm = $1",
			[id]
		);

		res.status(200).json(response.rows);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

exports.postUser = async (req, res) => {
	try {
		const {npm, display_name, password} = req.body;
		const response = await pool.query(
			"INSERT INTO users (npm, display_name, password) VALUES ($1, $2, $3)",
			[npm, display_name, password]
		);

		res.status(201).json({message: "User added successfully"});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};
