const mongoose=require("mongoose")
const customerSchema=new mongoose.Schema({
    name:String,
    amount:Number,
    selected:Boolean
})
const Customer=mongoose.model("customers",customerSchema)
module.exports=Customer