const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    managerID: {
        //type: Schema.Types.ObjectId,
        type: Number,
        ref: "Manager",
        required: true
    },
    managerName: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: "Manager",
        required: true
    },
    tasks: [{
        taskText: {
            type: String,
            required: true
        },
        assignDate: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model('Employee', EmployeeSchema);