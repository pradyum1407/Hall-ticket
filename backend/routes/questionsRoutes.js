import express from "express"
import { uploadQuestion , questionBySubject } from "../controller/questionController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router()


router.post("/upload", protectedRoute,checkRole("admin"),uploadQuestion)

router.get("/:subject",protectedRoute, questionBySubject)

export default router;