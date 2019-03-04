

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const voteSchema = new Schema({
    vote:{
        type:Boolean,
        required:true
    },
    username:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('vote', voteSchema);