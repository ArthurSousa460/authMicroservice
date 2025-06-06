import { PrismaClient } from "@prisma/client/extension";
import { Roles } from "../../prisma/generated/prisma/index.js";

class UserRepository{

    private prismaClient: PrismaClient;

    constructor(){
        this.prismaClient = new PrismaClient();
    }

    async findEmail(email: string){
        const findEmail = await this.prismaClient.User.findUnique({
            where: {
                email: email
            }
        })
        if (!findEmail){
            throw new Error("Email not find")
        } 
    }


    async create(name: String, email: String, password: String, role: Roles){
        const newUser = await this.prismaClient.user.create({
            data:{
                name,
                email,
                password,
                role   
            },
        })

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    }

    async update(id: number, name?: string, email?: String, password?: String, role?: Roles){
        return this.prismaClient.update(

        )
    }
}


export default UserRepository;