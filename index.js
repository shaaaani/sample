const express= require("express")

const jwt=require("jsonwebtoken")


const dataservice=require("./services/data service")

const app= express()

app.use(express.json())


const appMiddleware=(req,res,next)=>{
    try{
        token=req.headers["x-access-token"]
         result=jwt.verify(token,"secretsuperkey1234")
        console.log(result)

        next()

    }
    catch{
        res.status(400).json({
            status:false,
            message:"Invalid user...please login",
            statusCode:400
        })
    }
    
    // next()
}

// app.use(appMiddleware)


app.post('/register',(req,res)=>{

    const result=dataservice.register(req.body.acno,req.body.uname,req.body.phone,req.body.pswd)
    if(result.status==true){
        res.status(result.statusCode).json(result)

    }
    else{
        res.status(result.statusCode).json(result)
    }
})

app.post('/login',appMiddleware,(req,res)=>{
    const result=dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)

})

app.post('/deposite',appMiddleware,(req,res)=>{
    const result=dataservice.deposite(req.body.acc,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})

app.post('/withdraw',(req,res)=>{
    const result=dataservice.withdraw(req.body.acc,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})

app.post('/transact',(req,res)=>{
    const result=dataservice.getTransaction(req.body.acc)
    res.status(result.statusCode).json(result)
})


app.put('/',(req,res)=>{
    res.send("PUT request hit")
})

app.patch('/',(req,res)=>{
    res.send("PATCH requset hit")
})

app.delete('/',(req,res)=>{
    res.send("DELETE request hit")
})


app.listen(3000,()=>{
    console.log("servere running on part 3000")
})