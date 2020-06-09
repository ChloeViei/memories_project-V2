const mongoose = require('mongoose');
const _ = require('lodash');

const Memory = mongoose.model('Memory');

module.exports.allMemories = (req, res, next) =>{
    Memory.find((err, memories) => {
        if (!memories)
            return res.status(404).json({ status: false, message: 'Error in Retriving Memories' });
        else
            return res.send(memories);
    });
};


module.exports.oneMemory = (req, res, next) =>{
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
        return res.status(400).send(`No record with given id : ${req.body._id}`);
    }

    Memory.findOne({ _id: req._id },
        (err, memory) => {
            if (!memory)
                return res.status(404).json({ status: false, message: 'Memory record not found.' });
            else
                return res.send(memory);
        }
    );
};


module.exports.registerMemory = (req, res, next) => {
    let mem = new Memory ({
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
        createdAt: req.body.createdAt,
    });

    mem.save(function (err, memory) {
        if (!err)
            res.send(memory);
        else {
            return res.status(404).json(err);
        }

    });
};


module.exports.memoryModification = (req, res, next) =>{
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
        return res.status(400).send(`No record with given id : ${req.body._id}`);
    }
    let mem = {
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
        createdAt: req.body.createdAt,
    };

    Memory.findByIdAndUpdate(req.body._id, { $set: mem }, { new: true }, (err, memory) => {
        if (!err) {
            res.send(memory);
        }
        else {
            res.status(404).json({ status: false, message: 'Error in Memory Update' });
        }
    });
};


module.exports.memoryDelete = (req, res, next) =>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    Memory.findByIdAndRemove(req.params.id, (err, memory) => {
        if (!err) {
            res.send(memory);
        }
        else {
            res.status(404).json({ status: false, message: 'Error in Memory Delete' });
        }
    });
};
