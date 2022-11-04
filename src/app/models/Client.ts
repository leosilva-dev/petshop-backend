import mongoose, {Document, Schema} from 'mongoose'

interface IClient extends Document {
    name: string;
    email: string;
    createdAt: Date;
}

const ClientSchema = new Schema({
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
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


const Client = mongoose.model<IClient>('Client', ClientSchema)

export {Client}