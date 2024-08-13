const mongoose=require('mongoose')
const connect=mongoose.connect('mongodb://localhost:27017/SafeGuardHub')

// connection check
connect.then(()=>{
    console.log('connection established')
}).catch(()=>{
    console.log('Error in Database connection')
})
// userschema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

const collection=new mongoose.model('user',userSchema)

module.exports=collection