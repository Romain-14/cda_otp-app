
const FIND_USER_BY_USERNAME = 'SELECT username, password, hasOTP FROM users WHERE username = ?';

const INSERT_USER = "INSERT INTO users (username, password) VALUES (?, ?)"

export { FIND_USER_BY_USERNAME, INSERT_USER };