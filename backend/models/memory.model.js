const mongoose = require('mongoose');

let memorySchema = new mongoose.Schema({
    author: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
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
