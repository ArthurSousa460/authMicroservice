import { User, UserLogin, UserPayload } from "../index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import {compare} from "bcrypt";
import UserRepository from "../repositories/UserRepository.js";

export default class AuthService{
    private repository: UserRepository;
    private secretKey: string;

    constructor(){
        this.repository = new UserRepository();
        this.secretKey = process.env.SECRET_KEY || "secret";
        
        
    }
    private generateToken(user:User): string{
        return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, this.secretKey, {expiresIn: "1h"})
    }

    async verifyToken(token: string): Promise<UserPayload>{
        try{
            const payload = jwt.verify(token, this.secretKey);
             const { id, name, email, role } = payload as JwtPayload;
             return {
                id,
                name,
                email,
                role
            }
    }catch(error){
        throw new Error("Invalid token");
    }
}
        

    async login(user: User): Promise<UserLogin>{
        if (!user.email) throw new Error("Email is required");

        if (!user.password) throw new Error("Password is required");

        const userExist = await this.repository.findEmail(user.email);

        if (!userExist) throw new Error("User not found");

        const passwordMatch = await compare(user.password, userExist.password);

        if (!passwordMatch) throw new Error("Password or email is incorrect");

        const token = this.generateToken(userExist);

        return {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            role: userExist.role,
            token: token
        }
    }


}