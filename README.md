# ZoneTown.github.io-EmployeeManager

EmployeeManager
Objective
This website is used to create a employee database and store all of their information in at database through MongoDb. You can edit and delete any employee information through mongoose.

Technogoly
In this website I used MongoDb, Express, ejs, bosy-paser, mongoose, method-override, JavaScript and css in Viusal Stuidio Code.

Installation
Use the package manager npm to install packages in the termial.

npm install express
npm install ejs
npm install body-parser
npm install mongoose
npm install method-override
Usage
Express

const express = require('express');
const app = new express();
app.use(express.static('public'));
EJS

const ejs = require('ejs');
app.set('view engine', 'ejs');
Body-parser

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
Mongoose

const url = 'mongodb://localhost:27017/EmployeeDB';
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(url);
}
Method-override

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
JavaScript Code
Index JavaScript
Creating a Employee

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
Searching a Employee

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
Updating/Edit a Employee

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
Deleting a Employee

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
Creating a Server

const port = process.env.PORT || 4000;
app.listen(port);
console.log('Server started at http://localhost:' + port);
Schema
To Create the collections in Mongoose

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
HTML Code
LoggedIn Page
The Collection Displaying

<% for (let item of items) { %>
<div class="box">
  <li>First: <%= item.fname %> </li> 
  <li>Last: <%= item.lname %> </li>
  <li>Position: <%= item.job %> </li> 
  <li>Email: <%= item.email %> </li> 
  <li>Phone: <%= item.number %> </li> 
  <li>
    <button class="edit"><a href="/LoggedIn/<%= item._id%>/edit">Edit</a></button>
    <form id="buttons" action="/delete/<%= item._id %>?_method=DELETE"  method="POST">
      <button class="delete">Delete</button>
    </form>
  </li>
</div>
<% } %>
Edit and Delete Buttons

<button class="edit"><a href="/LoggedIn/<%= item._id%>/edit">Edit</a></button>
<form id="buttons" action="/delete/<%= item._id %>?_method=DELETE"  method="POST">
  <button class="delete">Delete</button>
</form>
Search Input and Button

<form action="/search" method="post">
  <input id="search" type="text" name="search" placeholder="Search by Last Name">
  <input type="submit" value="Search">
</form>
EmployeeManager Page
Form for creating employee

<form action="/create" method="post">
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname" required><br><br>
    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname" required><br><br>
    <label for="job">Position:</label>
    <input type="text" id="job" name="job" required><br><br>
    <label for="mail">Email:</label>
    <input type="text" id="mail" name="mail" required><br><br>
    <label for="phone">Phone Number</label>
    <input type="text" id="phone" name="phone" required><br><br>
    <input type="submit">
    <input type="reset">
  </form>
Edit Page
Form for editing

<form method ="post" action ="/LoggedIn/<%= items._id %>?_method=PUT">
    <label> First Name:</label>
    <input type="text" name="fname" value="<%= items.fname%>"><br><br>
    <label> Last Name:</label>
    <input type="text" name="lname" value="<%= items.lname%>"><br><br>
    <label>Position:</label>
    <input type="text" name="job" value="<%= items.job%>"><br><br>
    <label> Email:</label>
    <input type="text" name="mail" value="<%= items.email%>"><br><br>
    <label> Phone Number:</label>
    <input type="text" name="phone" value="<%= items.number%>"><br><br>
     <button>Submit</button>
</form>
Created by ZoneTown and Tessiq

