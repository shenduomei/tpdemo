

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('platuser', userSchema);