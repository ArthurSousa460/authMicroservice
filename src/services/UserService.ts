import { hash } from "bcrypt";
import { User, Roles } from "../index.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserService{
    private repository: UserRepository
    private salt: number;


    constructor(){
        this.repository = new UserRepository();
        this.salt = Number(process.env.SALT) || 10;

    }

    async register(user: User): Promise<Omit<User, "password">>{
        if (!user.email) throw new Error("Email is required");

        if (!user.password) throw new Error("Password is required");

        if (!user.name) throw new Error("Name is required");

        if (!user.role) throw new Error("Role is required");

        if (user.role !== "ADMIN" && user.role !== "USER") throw new Error(`Role '${user.role}' is invalid`);

        const userExist = await this.repository.findEmail(user.email)
        if (userExist) throw new Error("User already exists");

        const hashedPassword = await hash(user.password, this.salt);
        const newUser = await this.repository.create(user.name, user.email, hashedPassword, user.role)
        return newUser
    }


    





}