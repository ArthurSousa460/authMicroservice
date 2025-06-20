import { UserPayload } from "../index.js";

export class AuthorizationService {
    constructor(){  
    }

    private hasRole(role: string, authorizedRoles: string[]): boolean{
        return authorizedRoles.includes(role);
    }

    public isAuthorized(user: UserPayload, authorizedRoles: string[]): boolean{
        return this.hasRole(user.role, authorizedRoles);
    }
}
