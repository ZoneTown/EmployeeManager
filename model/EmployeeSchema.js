const mongoose = require("mongoose")
const EmployeeSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    job: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: String
    }
});
const Employees = mongoose.model('Employees', EmployeeSchema);
module.exports = Employees