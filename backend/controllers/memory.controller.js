const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
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
    if (!ObjectId.isValid(req._id))
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


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Memory.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Memory.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
