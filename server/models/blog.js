import { Schema, model } from 'mongoose'




const blog = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true
    }

})



export default model('Blog', blog)

    
    





