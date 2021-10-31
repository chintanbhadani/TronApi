const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        // required: true
    },
    releasedyear:{
        type: Date,
        // required: true
    },
    rating:{
        type:Number,
        // required:true
    },
    id:{
        type:String,
        // required: true,
    },
    genres: []

});

module.exports = mongoose.model("Movie",movieSchema);