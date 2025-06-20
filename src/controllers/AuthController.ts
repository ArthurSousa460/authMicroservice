import AuthService from "../services/AuthService.js";
import { Request, Response } from "express";
import loginSchema from "../schemas/loginSchema.js";
import { parse } from "zod/v4-mini";

export default class AuthController{
    private service: AuthService;

    constructor(){
        this.service = new AuthService();
    }

    async login(req: Request, res: Response){
        try {
            const parsed = loginSchema.safeParse(req.body);

            if (!parsed.success){
                return res.status(422).json({message: parsed.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message
                }))});
            }

            const user = await this.service.login(req.body);
            res.status(200).json(user);
        } catch (error) {
            const messageError = error instanceof Error ? error.message : String(error);
            res.status(400).json({message: messageError});
        }
    }
    
} 