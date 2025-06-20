import UserService from "../services/UserService.js";
import { Request, Response } from "express";
import createUserSchema from "../schemas/CreateUserSchema.js";

export default class UserController{
    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    async register(req: Request, res: Response){
        try {
           const parsed = createUserSchema.safeParse(req.body);
            if (!parsed.success){ 
                return res.status(400).json({message: parsed.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message
                }))});
            }

            const user = await this.service.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            const messageError = error instanceof Error ? error.message : String(error);
            res.status(400).json({message: messageError});
        }
    }
    
}