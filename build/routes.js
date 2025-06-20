import { Router } from "express";
import UserController from "./controllers/UserController.js";
import AuthController from "./controllers/AuthController.js";
import { authenticate, authorize } from "./middleware/auth.js";
const router = Router();
const userController = new UserController();
const authController = new AuthController();
router.get("/", (req, res) => {
    res.status(200).json({ "message": "Welcome to the api" });
});
router.post("/user/register", async (req, res) => { userController.register(req, res); });
router.post("/login", async (req, res) => { authController.login(req, res); });
router.get("/route-protected", authenticate, authorize(["ADMIN"]), async (req, res) => {
    res.status(200).json({ message: "Route protected" });
});
export default router;
//# sourceMappingURL=routes.js.map