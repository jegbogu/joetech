import {Schema, model,models} from 'mongoose'
const mongoose = require('mongoose')

const regSchema = new Schema({
    username:{
        type: String,
        require: true,
        minLength:[15,'email characters must be greater fifteen'],
        toLowerCase:true,
        trim: true,
        unique: true
      },
      password:{
        type: String,
        require: true,
        trim: true
    },
    use:{
        type: String,
        require: true,
        trim: true
    },
    company:{
        type: String,
        require: true,
        trim: true
    },
    company:{
        type: String,
        require: true,
        trim: true
    },
    companyName:{
        type: String,
        require: true,
        minLength:[5,'company namecharacters must be greater five'],
        trim: true,
        toLowerCase:true,
    },
    message:{
        type: String,
        require: true,
        trim: true
    }


})

// const Users = models.Users || model('Users',regSchema)
// export default Users

module.exports = models.Users|| mongoose.model('Users',regSchema)