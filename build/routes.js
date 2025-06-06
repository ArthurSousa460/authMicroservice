import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.status(200).json({ "message": "Welcome to the api" });
});
export default router;
//# sourceMappingURL=routes.js.map