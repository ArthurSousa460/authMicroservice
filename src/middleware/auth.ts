import { NextFunction, Request, RequestHandler, Response } from "express";
import AuthService from "../services/AuthService.js";
import { UserPayload } from "../index.js";
import { AuthorizationService } from "../services/AutorizationService.js";

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
  }
}
}

const authService = new AuthService();

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({message: "No token provided"});

    const parts = authHeader.split(" ");
    if(parts.length !== 2) return res.status(401).json({message: "Token error"});

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({message: "Token malformatted"});

    try{
        const decoded =  await authService.verifyToken(token);
        req.user = decoded;
        return next();
    }catch(error){
        return res.status(401).json({message: "Token invalid"});
    }

}

export function authorize(authorizedRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const authorizationService = new AuthorizationService();
        if(!user) return res.status(401).json({message: "Unauthorized"});
        if(!authorizationService.isAuthorized(user, authorizedRoles)) return res.status(403).json({message: "Forbidden"});
        return next();
    }
}