import mongoose from "mongoose";

const submissonSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User'
    },
    subject:String,

    answers:[
    {
        questionId:mongoose.Schema.Types.ObjectId,
        answer:String
    }
    ],
    score:Number,
    submittedAt:{type:Date , default:Date.now}
});

const Submisson = mongoose.model("Submisson", submissonSchema)

export default Submisson