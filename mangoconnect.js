
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finallectur').then(()=>{
    console.log('connect')
})