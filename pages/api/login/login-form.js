import connectDB from "../../../utils/connectmongo"
 const Users = require('../../../model/registerSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
  
     
    
 async function handler(req,res){
    if(req.method === 'POST'){
        try {
        await connectDB()
        const{username, password} = req.body
        // console.log({username, password})

        const user = await Users.findOne({username}) 
        //  console.log(userID)
         const validUser = await bcrypt.compare(password, user.password)
         console.log(validUser)
         if(!validUser){
            res.status(403).json({message:'not a user'})
          return
         }
         res.status(200).json(user);
        
         
         
        } catch (error) {
            console.log(error)
        }
    }
}

export default handler