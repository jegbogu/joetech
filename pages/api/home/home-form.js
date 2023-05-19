import connectDB from "../../../utils/connectmongo"
import Users from "../../../model/registerSchema" 
const bcrypt = require('bcrypt')




async function handler(req,res){
    if(req.method==='POST'){
        try {
             
            const{username,password,use,company,companyName,message} = req.body
            console.log('Connecting to Mongo')
            await connectDB()
            console.log('Connected to Mongo')
            console.log('Creating document')
            const hashedPassword = await bcrypt.hash(password,10)
            const doc = new Users({
                username,
                password:hashedPassword,
                use,
                company,
                companyName,
                message
            })
            await doc.save()
            console.log(doc)
            res.json({doc})

        } catch (error) {
            console.log(error)
            console.log('data saved!')
           
        }
        
    }
  

}

export default handler
