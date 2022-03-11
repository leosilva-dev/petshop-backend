import mongoose, {Document, Schema} from 'mongoose'

type User = Document & {}

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model<User>('User', UserSchema)

export {User}