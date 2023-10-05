const mongoose=require('mongoose')

const schema=mongoose.Schema

const userSchema=new schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
        // data:Buffer,
        // contentType:"image/png"
    }
})

module.exports=mongoose.model("Login",userSchema)