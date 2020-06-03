const mongoose = require('mongoose');

let memorySchema = new mongoose.Schema({
    author: {
        type: String
    },
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    text: {
        type: String,
        required: 'Text can\'t be empty'
    },
    date: {
        type: Date
    }
});


mongoose.model('Memory', memorySchema);
