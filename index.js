const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = new express();
const port = process.env.PORT || 4000;
const url = 'mongodb://localhost:27017/EmployeeDB';
const Employee = require("./model/EmployeeSchema");
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(url);
}
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post("/create", function (req, res) {
    const data = new Employee({
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        email: req.body.mail,
        number: req.body.phone
    });
    data.save();
    res.redirect('/LoggedIn');
});;
app.post("/Search", function (req, res) {
    const Search = req.body.search;
    const search = Employee.findOne({ lname: Search }).exec();
    search.then(function (doc) {
        res.redirect('/LoggedIn/' + doc._id + '/edit');
    })
    .catch(err => {
        res.redirect('/LoggedInF')
    });
});
app.get('/', function (req, res) {
    res.render('EmployeeManager');
});
app.get('/Edit', function (req, res) {
    res.render('EditData');
});
app.get('/LoggedIn', async (req, res) =>{
    const items = await Employee.find({});
    let topic = "Successfully Logged In";
    res.render('LoggedIn', { items: items, topic: topic })
});
app.get('/LoggedInDataBase', async (req, res) => {
    const items = await Employee.find({});
    let topic = "Employee Database";
    res.render('LoggedIn', { items: items, topic: topic })

});
app.get('/LoggedInE', async (req, res) => {
    const items = await Employee.find({});
    let topic = "Successfully Edited";
    res.render('LoggedIn', { items: items, topic: topic })
});
app.get('/LoggedInD', async (req, res) => {
    const items = await Employee.find({});
    let topic = "Successfully Deleted";
    res.render('LoggedIn', { items: items, topic: topic })
});
app.get('/LoggedInF', async (req, res) => {
    const items = await Employee.find({});
    let topic = "Couldn't Find Employee";
    res.render('LoggedIn', { items: items, topic: topic })
});
app.get('/LoggedIn/:id/edit', async (req, res) => {
    const { id } = req.params;
    const items = await Employee.findById(id)
    res.render('EditData', { items })
});
app.put('/LoggedIn/:id', async (req, res) => {
    let searchQuery = { _id: req.params.id };
    const items = await Employee.find({});
    Employee.updateOne(searchQuery, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            job: req.body.job,
            email: req.body.mail,
            number: req.body.phone
        }
    })
        .then(employee => {
            res.redirect('/LoggedInE');
        })
        .catch(err => {
            res.redirect('/LoggedInE');
        });
});
app.delete('/delete/:id', async (req, res) => {
    let searchQuery = { _id: req.params.id };
    const items = await Employee.find({});
    Employee.deleteOne(searchQuery)
        .then(employee => {
            res.redirect('/LoggedInD');
        })
        .catch(err => {
            res.redirect('/LoggedInD');
        });
    
});
app.listen(port);
console.log('Server started at http://localhost:' + port);