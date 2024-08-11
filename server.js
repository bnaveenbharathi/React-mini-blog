    const express=require('express')
    const browsersync=require('browser-sync').create()
    const collection=require('./db/db')
    const bcrypt=require('bcrypt')
    const session=require('express-session')





    const app=express()

    // basic setup
    app.set('view engine','ejs')
    app.use(express.json())
    app.use(express.static('public'))
    const title="SafeGuardHub"
    // routes

    app.get('/',(req,res)=>{
        res.render('main',{title:title})
    })
    
    app.get('/auth',(req,res)=>{
     res.render('auth',{title:title})
    })
// signup
    app.post('/signup',async (req,res)=>{
        const data= {
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            pass:req.body.password
        }
        try{
            const existing=await collection.findOne({email:data.email})
            if(existing){
                return res.send('User Already Exists.')
            }
            const hashedpass=await bcrypt.hash(data.pass,5)
            data.pass=hashedpass

            await collection.create(data)
            res.redirect('/login')
        }catch(err){
   console.log('Error During Signup',err)
   res.status(500).send("Internal server error")
        }
    })
//    login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await collection.findOne({email:email})
        if(!user){
        return res.send('user not found')
        }
        const passwordmatch=await bcrypt.compare(password,user.password)
        if(!passwordmatch){
            req.session.userId=user._id
            return res.redirect('/dashboard')
        }
        else{
            return res.send('password is Wrong')
        }
    }catch(err){
console.log("Error during Login",err)
return res.status(500).send("Internal Server error")
    }

})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
   
    // server run
    app.listen(3000,"0.0.0.0",(err)=>{
        if(!err){
            console.log("Server is running http://0.0.0.0:3000")
            browsersync.init({
                proxy:"http://localhost:3000/",
                files:['views/**/*.*','public/**/*.*'],
                port:5000
        })
        browsersync.reload()
        }
 
        else{
            console.log(err)
        }
    })