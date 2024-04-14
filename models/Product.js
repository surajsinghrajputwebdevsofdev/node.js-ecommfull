import mongoose from "mongoose";
const ProductSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    image:{
        type:[String],
        required:true,
    },
},{timestamps:true})
const ProductModel = mongoose.model("product",ProductSchema);
export default ProductModel;