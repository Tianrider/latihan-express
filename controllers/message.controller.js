const pool = require("../db/db.pool");

exports.getAllMessage = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM message");

		res.status(200).json(response.rows);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

exports.getMessageByUserId = async (req, res) => {
	try {
		const {id} = req.params;
		const response = await pool.query(
			"SELECT * FROM message WHERE _from = $1",
			[id]
		);

		res.status(200).json(response.rows);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

exports.postMessage = async (req, res) => {
	try {
		const {message, _from} = req.body;

		const checkId = await pool.query("SELECT * FROM users WHERE npm = $1", [
			_from,
		]);

		if (checkId.rows.length === 0) {
			return res.status(400).json({error: `Invalid user ${_from}`});
		}

		await pool.query(
			"INSERT INTO message (message, _from) VALUES ($1, $2)",
			[message, _from]
		);

		res.status(201).json({message: "Message added successfully"});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};
