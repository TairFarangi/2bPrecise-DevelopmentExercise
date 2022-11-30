const express = require('express');
const router = express.Router()
const employeeModel = require('../models/employeeModel');
const managerModel = require('../models/managerModel') ;

router
    .route('/')
    .get(async (req, res) => {

        const resToClient = await employeeModel.find().select('firstName lastName position id');
        res.send(resToClient);
    })
    .put(async (req, res) => {
        const idField = req.body.id
        const filter = { id: idField }
        queryRes = await employeeModel.findOne(filter); // obj
        res.send(queryRes);
    })
    .post(async (req, res) => {

        const managerId = req.body.id
        const reportText = req.body.reportText
        const filter = { id: managerId }
        const managerObj = await managerModel.findOne(filter)

        if (managerObj !== undefined && managerObj !== null) {

            var managerReportsList = managerObj.reportsList
            managerReportsList.push({ reportText: reportText, reportDate: new Date().toString() })

            var update = {
                reportsList: managerReportsList
            }

            await managerModel.updateOne(filter, update)
        }
    })

router
    .route('/:employeeID')
    .get(async (req, res) => {

        const idEmployee = req.params.employeeID
        const filter = { id: idEmployee }
        managerQuery = await managerModel.findOne(filter)

        if (managerQuery != null) { //this is a manager 
            var subordinatesArr = []
            var arrOfIdSubordinates = managerQuery.employees

            for (var i = 0; i < arrOfIdSubordinates.length; i++) {
                let employeeId = arrOfIdSubordinates[i]
                var subordinateDetails = await employeeModel.find({ id: employeeId }).select("id firstName lastName position")
                subordinatesArr.push(subordinateDetails[0])
            }

            res.send(subordinatesArr)

        } else {
            res.send(null)
        }



        //check if this employee is a manager 
        // if (arrOfIdSubordinates !== undefined) {

        //     let subordinatesArr = [];

        //     arrOfIdSubordinates.map(async (subordinateID) => {
        //         var subordinateDetails = await employeeModel.find({ id: subordinateID }).select("id firstName lastName position")
        //         subordinatesArr.push(subordinateDetails[0])

        //         console.log(subordinatesArr)
        //         //console.log(subordinateDetails[0])
        //         //console.log(subordinatesArr);
        //     })

        //     console.log(subordinatesArr);
        //     res.send(subordinatesArr)
        // }
        // else {
        //     res.send("error")
        // }

    })
    .post(async (req, res) => {

        const employeeId = req.body.id
        const taskText = req.body.taskText
        const dueDate = req.body.dueDate
        const filter = { id: employeeId }
        const employeeObj = await employeeModel.findOne(filter)

        if (employeeObj !== undefined || employeeObj != null) {
            var employeeTaskList = employeeObj.tasks
            employeeTaskList.push({ taskText: taskText, assignDate: new Date().toString(), dueDate: dueDate })

            var update = {
                tasks: employeeTaskList
            }
            await employeeModel.updateOne(filter, update)
        }
    })










// employeeModel.insertMany([
//     {
//         id: 1, firstName: "Lital", lastName: "Cohen", position: "Data Scientist", managerID: 5, managerName: "Beni Biton",
//         tasks: [{ taskText: "task1     ", assignDate: "12/3/22", dueDate: "1/12/22" }, { taskText: "task2     ", assignDate: "12/5/22", dueDate: "1/12/22" }]
//     },
//     {
//         id: 2, firstName: "Tohar", lastName: "Levi", position: "Junior SDET", managerID: 5, managerName: "Beni Biton",
//         tasks: [{ taskText: "task3     ", assignDate: "12/3/22", dueDate: "1/12/22" }, { taskText: "task4     ", assignDate: "15/8/22", dueDate: "1/12/22" }]
//     },
//     {
//         id: 3, firstName: "Beni", lastName: "Cohen", position: "Devops", managerID: 5, managerName: "Beni Biton",
//         tasks: [{ taskText: "task5     ", assignDate: "12/3/22", dueDate: "1/12/22" }, { taskText: "task6     ", assignDate: "14/5/22", dueDate: "1/12/22" }]
//     }, {
//         id: 4, firstName: "Shlomi", lastName: "Biton", position: "Full-Stack", managerID: 5, managerName: "Beni Biton",
//         tasks: [{ taskText: "task7     ", assignDate: "12/3/22", dueDate: "1/12/22" }, { taskText: "task8     ", assignDate: "13/8/22", dueDate: "1/12/22" }]
//     }, {
//         id: 5, firstName: "Beni", lastName: "Biton", position: "SW engineer", managerID: 5, managerName: "Beni Biton",
//         tasks: [{ taskText: "task9     ", assignDate: "12/3/22", dueDate: "1/12/22" }, { taskText: "task10     ", assignDate: "13/8/22", dueDate: "1/12/22" }]
//     }
// ])

// managerModel.insertMany([
//     { id: 5, employees: [1, 2, 3, 4], reportsList: [{ reportText: "The computer is not Working", reportDate: new Date().toString() }] }
// ])

module.exports = router;


