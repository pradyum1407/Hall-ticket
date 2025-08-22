import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import examRoutes from "./routes/examRoutes.js"
import questionRoutes from "./routes/questionsRoutes.js"
// import  hallTicketRoutes from "./routes/hallRoutes.js"


import cors from "cors"
import { connectDb } from "./lib/db.js";

const app= express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

dotenv.config();
const PORT =  process.env.PORT;

app.use("/api/auth",authRoutes),
app.use('/api/questions',questionRoutes),
app.use('/api/exam', examRoutes),
// app.use('/api/hallticket', hallTicketRoutes)


//connection 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDb();
})
