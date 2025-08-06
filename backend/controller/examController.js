import { z } from "zod"
import Exam from "../modal/Exam.js"
import User from "../modal/User.js"
import JoinExam from "../modal/JoinExam.js"
import Question from "../modal/Question.js"


const examSchema = z.object({
    subject: z.string().min(1),
    date: z.string(),
    numberOfQuestion: z.number()
})

export async function createExam(req, res) {
    const result = examSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ msg: "invalid inputs" })
    }

    try {
        const { subject, date, numberOfQuestion } = result.data

        const newExam = await Exam.create({
            subject,
            date,
            numberOfQuestion,
            createdBy: req.user._id
        })

        res.status(200).json({ success: true, msg: 'exam created', exam: newExam })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "error in the exam controller route" })
    }

}

export async function getAllStudents(req, res) {

    try {
        const students = await User.find({ role: "student" }).select("-password")
        res.status(200).json({ success: true, students })

    } catch (error) {
        console.log(error),
            res.status(500).json({ msg: "error in  the getallstudent route" })
    }
}

export async function joinExam(req, res) {
    const userId = req.user._id;
    const { subject } = req.body

    if (!subject) {
        return res.status(401).json({ msg: "Invalid inputs" })
    }

    try {
        const alreadyJoined = await JoinExam.findOne({ userId, subject })

        if (alreadyJoined) {
            return res.status(400).json({ msg: "you already joined  the exam" })
        }

        const join = await JoinExam.create({
            userId,
            subject
        })

        return res.status(200).json({ success: true, data: join, msg: "joined the  exam succesfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error  in the joinexam route' })
    }
}

export async function startExam(req, res) {
    const userId = req.user._id;
    const subject = req.params.subject;


    try {

        // check  the joining  of the exam

        const joined = await JoinExam.findOne({ userId, subject });

        if (!joined) {
            return res.status(403).json({ msg: "you have  not joined the exam" })
        }


        //get the number of question dynamically
        const exam = await Exam.findOne({ subject })
        if (!exam) {
            return res.status(404).json({ msg: "exam was not found for this subject" })
        }

        const numberOfQuestion = exam.numberOfQuestion;


        // fetch all the  queestion of the subject
        const data = await Question.findOne({ subject });
        if (!data || !data.questions || data.questions.length === 0) {
            return res.status(400).json({ msg: "unabel  to find the  question of this  subbject" })
        }

        //generating  the random questions
        const shuffled = [...data.questions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, numberOfQuestion)

        //filter the qustions array
        const questionSet = selectedQuestions.map(q => ({
            questionId: q._id,
            question: q.question,
            answer: q.answer
        }))

        await JoinExam.updateOne({ userId, subject }, { $set: { questionSet } });


        //format shown on the frontend
        const publicQuestions = questionSet.map(q => ({
            questionId: q._id,
            question: q.question
        }))

        res.status(200).json({
            success: true,
            subject,
            question: publicQuestions
        })

    } catch (error) {
        console.log(error),
            res.status(500).json({ msg: "internal error in Start exam" })
    }

}

export async function submitAnswer(req, res) {

    const userId = req.user._id;
    const subject = req.params.subject;
    const submitAnswer = req.body.answers;

    try {

        const joined = await joinExam.findOne({ userId, subject })
        if (!joined || !joined.questionSet || !joined.questionSet.length === 0) {
            return res.status(403).json({ msg: "you have not started the exam" })
        }

        const storedQuestions = joined.questionSet;
        let score = 0;

        for (const submitted of submitAnswer) {
            const original = storedQuestions.find(q => q.questionId.toString() === submitted.questionId);
            if (
                original &&
                submitted.answer.trim().toLowerCase() === original.answer.trim().toLowerCase()
            ) {
                score++;
            }
        }

        await Submission.create({
            userId,
            subject,
            answers: submitAnswer,
            score
        });

        res.status(200).json({
            success: true,
            msg: 'Exam submitted successfully',
            score
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal error in submitAnswers' });
    }


}