import {success, z} from "zod"
import Exam  from "../modal/Exam.js"
import User from "../modal/User.js"

const examSchema=z.object({
    subject:z.string().min(1),
    date:z.string(),
    numberOfQuestion:z.number()
})

export async function createExam(req,res) {
    const result = examSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({msg:"invalid inputs"})
    }

    try {
       const {subject , date , numberOfQuestion} = result.data

       const newExam = await Exam.create({
        subject,
        date,
        numberOfQuestion,
        createdBy:req.user._id
       })

res.status(200).json({success:true , msg:'exam created'  , exam:newExam})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error in the exam controller route"})
    }

}

export async function getAllStudents(req, res) {
    
    try {
        const students = await User.find({role:"student"}).select("-password")
        res.status(200).json({success:true , students})

    } catch (error) {
        console.log(error),
        res.status(500).json({msg:"error in  the getallstudent route"})       
    }
}