import mongoose, {Document, Schema} from 'mongoose'

const specieTypes = Object.freeze({
    dog:'cachorro',
    cat:'gato',
    turtle:'tartaruga'
})

interface IPet extends Document {
    name: string;
    age: number;
    specie: string;
}

const PetSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },
    specie:{
        type:String,
        enum: Object.values(specieTypes)    
    }
})



const Pet = mongoose.model<IPet>('Pet', PetSchema)

export {Pet}