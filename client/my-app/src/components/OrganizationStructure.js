import { useState, useEffect } from 'react';
import axios from 'axios';

import Employee from './Employee'
import EmployeeDetails from './EmployeeDetails'

function OrganizationStructure() {

    const [employeeList, setEmployeeList] = useState(null)
    const [employeeDetails, setEmployeeDetails] = useState(null)
    const [subordinates, setSubordinates] = useState(null)
    const [subordinateId, setSubordinateId] = useState(null)

    const [showList, setShowList] = useState(true)
    const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
    const [showReportPopup, setShowReportPopup] = useState(false)
    const [showTaskPopup, setShowTaskPopup] = useState(false)

    const [reportText, setReportText] = useState(null)
    const [taskText, setTaskText] = useState(null)
    const [dueDate, setDueDate] = useState(null)

    useEffect(() => {
        getEmployeeList();
    }, []);

    async function getEmployeeList() {
        let res = await axios.get('//localhost:8000');
        // console.log(res.data[0].firstName);

        let objData = res.data
        setEmployeeList(objData)
    }
    function sendIdOfEmployeeFunc(employeeId) {

        axios.put('//localhost:8000', { id: employeeId }).then(async (res) => {
            console.log('send id to server and get the details of the employee')
            const objData = res.data

            setEmployeeDetails(objData)
            setShowList(false)
            setShowEmployeeDetails(true)

            //check if this employee is a manager
            var subordinatesQuery = await axios.get(`//localhost:8000/${employeeId}`) //obj 
            var subordinates = subordinatesQuery.data
            setSubordinates(subordinates)
        }).catch((err) => {
            console.error(err);
        })
    }


    //report
    function reportToManagerFunc() {

        setShowReportPopup(true);
        setShowEmployeeDetails(false)
    }
    function getReportTextValue(text) {

        setReportText(text.target.value);
    }
    function addReport() {

        const managerID = employeeDetails.managerID
        //search for report list of the manager and add the details that the user add to the form 
        axios.post('//localhost:8000', { id: managerID, reportText: reportText }).then(() => {
            console.log('send report to server')
        })

        alert("your report sent to your manager")
        setShowEmployeeDetails(true);
        setShowReportPopup(false)
    }
    function cancelReport() {
        setShowEmployeeDetails(true);
        setShowReportPopup(false)
    }


    //task
    function assignTaskFunc(employeeId) {
        setShowTaskPopup(true)
        setShowEmployeeDetails(false)
        setSubordinateId(employeeId)
    }
    function getTaskTextValue(text) {
        setTaskText(text.target.value)
    }
    function getDueDateValue(date) {
        setDueDate(date.target.value)
    }
    function addTask() {

        axios.post(`//localhost:8000/${subordinateId}`, { id: subordinateId, taskText: taskText, dueDate: dueDate }).then(() => {
            console.log('send task to subordinate')
        })

        alert("your task sent to your subordinate")
        setShowEmployeeDetails(true);
        setShowTaskPopup(false)
    }
    function cancelTask() {
        setShowEmployeeDetails(true);
        setShowTaskPopup(false);
    }


    return (
        <div>

            {showList &&
                <h1>Employee List:</h1>}
            <br />
            {showList && employeeList && employeeList.map((employee) => {
                return <Employee key={employee.id} employee={employee} buttonValue="View" onClickFunc={sendIdOfEmployeeFunc}></Employee>
            })}
            <br />


            {showEmployeeDetails && employeeDetails &&
                <EmployeeDetails Details employee={employeeDetails} subordinates={subordinates} reportToManagerFunc={reportToManagerFunc} assignTask={assignTaskFunc}> </EmployeeDetails>
            }


            {
                showReportPopup &&
                <form>
                    <textarea onChange={getReportTextValue} style={{ border: '1px solid', fontSize: "20px" }} rows="6" cols="50" placeholder='Enter your report' />
                    <br />
                    <br />
                    <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={addReport}>
                        Save
                    </button>
                    &emsp;
                    <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={cancelReport}>
                        Cancel
                    </button>
                </form>
            }

            {
                showTaskPopup &&
                <form>
                    <textarea onChange={getTaskTextValue} required={true} style={{ border: '1px solid', fontSize: "20px" }} rows="6" cols="50" placeholder='Task text' />
                    <br />
                    <textarea onChange={getDueDateValue} required={true} style={{ border: '1px solid', fontSize: "20px" }} rows="2" cols="10" placeholder='Due date' />

                    <br />
                    <br />
                    <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={addTask}>
                        Save
                    </button>
                    &emsp;
                    <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={cancelTask}>
                        Cancel
                    </button>
                </form>
            }
        </div >
    );
}

export default OrganizationStructure;