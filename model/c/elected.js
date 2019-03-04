

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const electedSchema = new Schema({
    user:{
        type:String,
        required:true,
    },
    vote:[String]
})

module.exports = mongoose.model('elected', electedSchema);