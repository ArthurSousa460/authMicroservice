import { success } from "zod/v4";
import { Roles } from "../../prisma/generated/prisma/index.js";
import createUserSchema from "../schemas/CreateUserSchema.js";
import {z} from "zod";

class UserDTO {
    private id?: string;
    private name?: string;
    private email?: string;
    private password?: string
    private role?: Roles;

    constructor(name: string, email: string, password: string, role: Roles){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    validate() {
    const parsed = createUserSchema.safeParse({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });

    if (!parsed.success) {
      return { success: false, errors: parsed.error.issues };
    }

    return { success: true, data: parsed.data };
  }
}


export default UserDTO;