import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatarUrl:String,
    socialOnly:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        unique :true
        //unique => 해당 형식의 값이 딱 하나만 존재하게 해줌
    },
    username:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type:String
    },
    location:{
        type:String
    }
})

userSchema.pre('save', async function(){
    /*
        이 context, function안에서의 this는
        생성되는 User 를 가리키고 있음
    */
   console.log('👀 users password =>', this.password)
    this.password = await bcrypt.hash(this.password, 5)
    console.log('🎃 hashed password =>', this.password)
})


const User = mongoose.model("User", userSchema)
export default User;