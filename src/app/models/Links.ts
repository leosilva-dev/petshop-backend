import mongoose, {Document, Schema} from 'mongoose'

interface ILink extends Document {
    title: string;
    url: string;
    enabled: boolean;
    order: number;
    user: string;
    createdAt: Date;
}

const LinkSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    enabled:{
        type:Boolean,
        required:true,
        default:true    
    },
    order:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
        createdAt:{
        type:Date,
        default:Date.now,
    }
})



const Link = mongoose.model<ILink>('Link', LinkSchema)

export {Link}