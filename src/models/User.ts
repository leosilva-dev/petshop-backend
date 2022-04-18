import mongoose, {Document, Schema} from 'mongoose'
import bcrypt from 'bcryptjs';

type User = Document & {}

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true
    },
    bio:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        // selected:false
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

const User = mongoose.model<User>('User', UserSchema)

export {User}