import mongoose from "mongoose";


const examSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    numberOfQuestion:{
        type:Number,
        required:true
    },
    createdBy :{type: mongoose.Schema.Types.ObjectId, ref:"User" , required:true }
},
{timestamps:true });


const Exam= mongoose.model("Exam", examSchema);

export default Exam;