import express from "express"
import {createExam, getAllStudents ,joinExam, startExam ,submitAnswer} from "../controller/examController.js"
import { protectedRoute } from "../middleware/protectedRoute.js";
import { checkRole } from "../middleware/checkRole.js";

const Router= express.Router()

Router.post("/create", protectedRoute, checkRole("admin"),createExam)
Router.get("/students" , protectedRoute, checkRole("admin"),getAllStudents)
Router.post("/join", protectedRoute,joinExam)
Router.get("/start-exam/:subject",protectedRoute, startExam)
Router.post("/submit-answer/:subject",protectedRoute,submitAnswer)

export default Router;
