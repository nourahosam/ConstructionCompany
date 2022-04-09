const mongoose      = require('mongoose')

const connection = mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });
mongoose.connection
    .once('open', ()=>{ console.info("Connected") })
    .on('error', (error)=>{ console.info("Your error is ", error)})