import { Router, Request, Response } from "express";
import UserController from "./controllers/UserController.js";
import AuthController from "./controllers/AuthController.js";



const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.get("/", (req:Request, res:Response) =>{
    res.status(200).json({"message": "Welcome to the api"});
})


router.post("/user/register", async (req: Request, res: Response) => {userController.register(req, res)});
router.post("/login", async (req: Request, res: Response) => {authController.login(req, res)});




export default router;