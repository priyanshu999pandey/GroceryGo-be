import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:Array,
        default:[],
    },
    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Category"
        }
    ],
    subCategory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"SubCategory"
        }
    ],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:Number,
        default:null,
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    more_detail:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


//create a text index
productSchema.index({
    name:"text",
    description:"text"
},{
   weights: {
            name: 10,         // Matches in 'name' are 10 times more relevant
            description: 5    // Matches in 'description' are 5 times more relevant
        }
})

const ProductModel = mongoose.model("Product",productSchema);
export default ProductModel;