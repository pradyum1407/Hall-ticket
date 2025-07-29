import express from "express"
import {createExam, getAllStudents} from "../controller/examController.js"
import { protectedRoute } from "../middleware/protectedRoute.js";
import { checkRole } from "../middleware/checkRole.js";

const Router= express.Router()

Router.post("/create", protectedRoute, checkRole("admin"),createExam)
Router.get("/students" , protectedRoute, checkRole("admin"),getAllStudents)

export default Router;
