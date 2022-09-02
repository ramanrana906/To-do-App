

const { format } = require('express/lib/response');
const Task = require('../models/task');



module.exports.home = function(req, res) {
    Task.find({}, function(err, tasks) {
        if(err) {
            console.log(`Error in fetching the tasks from db: ${err}`);
            return;
        }
        return res.render('home', {
            title: "ToDo App",
            list: tasks
        });
    })
}
// format the date properly to store in database
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
];

function formatDate(dueDate) {
    if(dueDate.length == 0) {
        return "NO DEADLINE";
    }

    const date = new Date(dueDate);
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

// adding a new task to the database
module.exports.addTask = function(req, res) {
    Task.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: formatDate(req.body.dueDate)
    }, function(err, newTask) {
        if(err) {
            console.log(`Error in adding a new task: ${err}`);
            return;
        }
        console.log(newTask);
        return res.redirect('back');
    })
}

// utility function to delete a single task
function deleteOne(task) {
    Task.findByIdAndDelete(task, function(err) {
        if(err) {
            console.log(`Error in deleting an object from db: ${err}`);
            return;
        }
    })
}

// function to delete the tasks from the database
function deleteTasks(tasks) {
    if(typeof tasks == 'string') {
        deleteOne(tasks);
    }
    else {
        for(let task of tasks) {
            deleteOne(task);
        }
    }
}

// deleting tasks from the database
module.exports.deleteTask = async function(req, res) {
    var obj = req.body;
    console.log(req.body);

    if(obj && Object.keys(obj).length == 0
        && Object.getPrototypeOf(obj) === Object.prototype)
        return res.redirect('back');

    var result = await deleteTasks(req.body.tasks);

    return res.redirect('back');
}

