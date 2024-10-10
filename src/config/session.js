export default {
	secret: process.env.ES_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
		sameSite: "strict",
		maxAge: 1200000, // 20 minutes
	},
    store: new MySQLStore({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }),
};
