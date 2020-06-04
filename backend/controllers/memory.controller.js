const mongoose = require('mongoose');
const _ = require('lodash');

const Memory = mongoose.model('Memory');

module.exports.allMemories = (req, res, next) =>{
    Memory.find((err, memories) => {
        if (!memories)
            return res.status(404).json({ status: false, message: 'Error in Retriving Memories' });
        else
            return res.status(200).json({ status: true, memories });
    });
};


module.exports.oneMemory = (req, res, next) =>{
    if (!mongoose.Schema.Types.ObjectId.isValid(req._id))
        return res.status(400).send(`No record with given id : ${req._id}`);

    Memory.findOne({ _id: req._id },
        (err, memory) => {
            if (!memory)
                return res.status(404).json({ status: false, message: 'Memory record not found.' });
            else
                return res.status(200).json({ status: true, memory : memory });
        }
    );
};


module.exports.registerMemory = (req, res, next) => {
    let memory = new Memory();
    memory.author = req.body.author;
    memory.title = req.body.title;
    memory.text = req.body.text;

    memory.save((err, memory) => {
        if (!err)
            res.send(memory);
        else {
            return res.status(404).json(err);
        }

    });
};


module.exports.memoryModification = (req, res, next) =>{
    if (!mongoose.Schema.Types.ObjectId.isValid(req._id))
        return res.status(400).send(`No record with given id : ${req._id}`);

    let mem = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };

    Memory.findByIdAndUpdate(req._id, { $set: mem }, { new: true }, (err, memory) => {
        if (!err) {
            res.send(memory);
        }
        else {
            res.status(404).json({ status: false, message: 'Error in Memory Update' });
        }
    });
};


module.exports.memoryDelete = (req, res, next) =>{
    if (!mongoose.Schema.Types.ObjectId.isValid(req._id))
        return res.status(400).send(`No record with given id : ${req._id}`);

    Memory.findByIdAndRemove(req._id, (err, memory) => {
        if (!err) {
            res.send(memory);
        }
        else {
            res.status(404).json({ status: false, message: 'Error in Memory Delete' });
        }
    });
};
