const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
        {
    username: {
        type: string,
        require:true
    },
    age:Number
    }, { strict: true }
)

//// connect collection user   schema=> userSchema

const user = mongoose.model('user', userSchema);
 
module.exports = {
    user
}