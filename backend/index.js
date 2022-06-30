const express=require("express")
const cors=require("cors")
const app=express();
const mongoose=require("mongoose")
const Customer=require("./models/customer")

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/swapp?retryWrites=true&w=majority")
.then(async()=>{
    app.listen(4000,()=>console.log("server is running on port 4000 . . . "))
})
.catch(err=>{
    console.log(err)
})
app.get('/customers',async (req,res)=>{
    try {
        const customers= await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.status(403).send("no available data")
    }
})
app.put('/customers/:id',async (req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        await Customer.findOneAndUpdate({_id:id},{selected:!data.selected})
        res.status(200)
    } catch (error) {
        res.status(400).send("id not found")
    }
})
app.get('/pdfData',async (req,res)=>{
    try {
        const customers=await Customer.find({selected:true})
        let total=0
        customers.map(i=>total+=i.amount)
        res.status(200).json({customers,total})
    } catch (error) {
        res.status(403).send("no available data")
    }
})
