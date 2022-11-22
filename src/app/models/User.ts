import mongoose, {Document, Schema} from 'mongoose'
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        selected:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model<IUser>('User', UserSchema)

export {User}