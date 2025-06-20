import { PrismaClient } from "@prisma/client";

class UserRepository{

    private prismaClient: PrismaClient;

    constructor(){
        this.prismaClient = new PrismaClient();
    }

    async findEmail(email: string){
        const findEmail = await this.prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        return findEmail;
    }


    async create(name: string, email: string, password: string, role: any){
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

    async update(id: number, name?: string, email?: string, password?: string, role?: any){
        return await this.prismaClient.user.update(
            {
                where: {
                    id: id
                },
                data: {
                    name,
                    email,
                    password,
                    role
                }
            }
        )
    }
    async delete(id: number){
        return this.prismaClient.user.delete(
            {
                where: {
                    id: id
                }
            }
        )
    }
}


export default UserRepository;