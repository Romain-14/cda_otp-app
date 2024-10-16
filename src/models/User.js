import pool from "../config/db.js";

import { FIND_USER_BY_USERNAME, INSERT_USER } from "./query.js";

class User {
	static async findByUsername(username) {
		const [[user]] = await pool.execute(FIND_USER_BY_USERNAME, [username]);
		return user;
	}

	static async add(username, password) {
		const [result] = await pool.execute(INSERT_USER, [username, password]);
		return result;
	}
}

export default User;
