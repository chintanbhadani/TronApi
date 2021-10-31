const express = require('express')
const mongoose = require('mongoose')
const route1 = require("./routes/routes")

const app = express()
const PORT = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

// mongoose.connect('mongodb://localhost:27017/IMDB', 
// { useNewUrlParser: true }, 
// (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });

mongoose.connect('mongodb+srv://chintanB:1234@cluster0.ovz1t.mongodb.net/IMDB?retryWrites=true&w=majority', 
{ useNewUrlParser: true ,useUnifiedTopology: true}, 
(err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

app.use("",route1)

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
});