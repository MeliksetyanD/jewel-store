import {Schema, model} from 'mongoose'




const product = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    sizes: {
        type: String,
        required: true
    },
    colorus: {
        type: String,
        required: true
    },
    weight:{
        type: Number,
        allowNull: false,
    },
    material:{
        type: String,
        required: true
    },
    categoryname:{
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true
    }
})



export default model('Product', product)

    
    











