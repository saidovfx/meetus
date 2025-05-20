const mangoose=require('mongoose')
const UserSchema=new mangoose.Schema({
    email:{
        type:String,
        required:false,
        unique:false,
    },
    username:{
          type:String,
        required:true,
        unique:true, 
    },
    passwordHash:{
type:String,
required:true,
    
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports=mangoose.model('Messanger',UserSchema)
