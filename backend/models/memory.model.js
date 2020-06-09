const mongoose = require('mongoose');

let memorySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        // type: String,
        required: 'Author can\'t be empty'
    },
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    text: {
        type: String,
        required: 'Text can\'t be empty'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Memory', memorySchema);
