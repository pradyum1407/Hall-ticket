import express from "express"
import { uploadQuestion } from "../controller/questionController.js";

const router = express.Router()

router.post("/upload", uploadQuestion)

export default router;