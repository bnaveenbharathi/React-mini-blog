    const express=require('express')
    const browsersync=require('browser-sync').create()





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
    
    app.get('/login',(req,res)=>{
     res.render('auth',{title:title})
    })


   
    browsersync.reload()
    // server run
    app.listen(3000,"0.0.0.0",(err)=>{
        if(!err){
            console.log("Server is running http://0.0.0.0:3000")
            browsersync.init({
                proxy:"http://localhost:3000/",
                files:['views/**/*.*','public/**/*.*'],
                port:5000
        })
        }
 
        else{
            console.log(err)
        }
    })