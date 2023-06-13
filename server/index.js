const express = require('express');
const app = express();
const cors =require ('cors')
const User = require ('./models/user')
const mongoose = require ('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/tempLoginRegSystem");
app.use(cors());
app.use(express.json());

app.post('/api/register',async(req,res)=>{


    try{
        const user1= await User.findOne(
            {
                email:req.body.email,
                password:req.body.password
            });
            console.log("user1:",user1);
            if(user1)
            {
                return res.status(400).send({ message: "User already exists" });
            }
            else
            {
                const user=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                });
                console.log(user);
                user.save();
                res.json({status:'ok'});
            }

    
    }
    catch(err){
        res.json({status:"error occured"});
    }
})
app.post('/api/login',async(req,res)=>{


        const user= await User.findOne(
            {
                email:req.body.email,
                password:req.body.password
            });

            if(user)
            {
                return res.json({status:"ok",message:"you are login"});
            }
            else{
                res.json({
                    status:"error"
                });
            }
           
    
    
})
app.listen(5000,()=>{
    console.log("server started on port 3000");
})