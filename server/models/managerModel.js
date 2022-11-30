const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({

    id: {
        type: Number,
        required: true
    },
    employees: [{
        //type: Schema.Types.ObjectId, //id of the employee
        type: Number, //id of the employee
        ref: "Employee",
        required: true
    }],
    reportsList: [
        {
            reportText: {
                type: String,
                required: true
            },
            reportDate: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Manager', ManagerSchema);