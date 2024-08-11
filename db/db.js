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
    },
    ph_no:{
        type:String,
        required:true
    }, 
    location:{
        type:String,
        required:true
    },
    noti_pre:{
        type:String,
    }

})

const collection=new mongoose.model('users',userSchema)

module.exports=collection