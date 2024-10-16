import bcrypt from "bcrypt";
import User from "../models/User.js";

class UserService {

	static async create(user) {
		const { username, password } = user;
		const isUserExist = await User.findByUsername(username);
		
		if (!isUserExist) {
            const hash    = await bcrypt.hash(password, 10);
			const newUser = await User.add(username, hash);

			return newUser;

		} else throw new Error("User already exists");
		
	}

    static async login(user) {
        const { username, password } = user;
        const userFound = await User.findByUsername(username);

        if (!userFound) throw new Error("User not found");

        const isPasswordCorrect = await bcrypt.compare(password, userFound.password);

        if (isPasswordCorrect) return userFound;
        else throw new Error("Incorrect password");
    }

    static async dashboard(user) {
        const { username, hasOTP } = await User.findByUsername(user.username);
        return { username, hasOTP };
    }

}

export default UserService;
