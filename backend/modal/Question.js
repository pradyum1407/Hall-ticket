import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    questions: [
        {
            question: String,
            answer: String
        }
    ]

})

const question = mongoose.model("Question", questionSchema)

export default question;