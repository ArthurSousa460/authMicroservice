import {z} from "zod";


const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["ADMIN", "USER"])
    
})

export default createUserSchema;