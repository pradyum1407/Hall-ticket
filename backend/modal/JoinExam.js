import mongoose from "mongoose";

const joinExamSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    subject: {
    type: String,
    required: true
  },
    joinedAt:{
        type:Date,
        default:Date.now
    }
});

const JoinExam = mongoose.model("joinExam", joinExamSchema);

export default JoinExam;