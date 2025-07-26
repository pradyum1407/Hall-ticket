import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema =new mongoose.Schema({
    name:{type:String,required : true},
    email:{type:String , unique: true},
    password:{type:String, required:true},
    role:{type:String ,default:"student"}   

})



userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.matchPassword= async function (entirePassword) {
    const isPasswordCorrect=await bcrypt.compare(entirePassword,this.password)
    return isPasswordCorrect;
}
   



const User=mongoose.model('User', userSchema)

export default User;
