import Employee from './Employee'
import Task from './Task'

function EmployeeDetails({ employee, subordinates, reportToManagerFunc, assignTask }) {
    return <div>

        <h2>&emsp; Name:   &emsp;&emsp;&emsp;{employee.firstName} {employee.lastName}</h2>
        <h2>&emsp;Position: &emsp;&emsp;{employee.position}</h2>
        <br />
        <h2>&emsp;&emsp;&emsp;&emsp;Manager: &emsp;&emsp;{employee.managerName} <label>
            &emsp;<button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={() => reportToManagerFunc()}> Report </button>

            {/* <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={() => reportToManager(props.directManager)}> Report </button> */}
        </label>
        </h2>

        <br />

        {/* <tr> */}
        <h3 > My tasks:  </h3>
        {/* </tr> */}

        {employee.tasks.map((task) => {
            return <Task key={task.taskText} data={task}></Task>
        })}
        <br />

        {/* if the employee have subordinates: get object of the subordinates and show it */}
        {subordinates && <h3> My subordinates: </h3> &&
            subordinates.map((subordinate) => {
                return <Employee key={subordinate.id} employee={subordinate} buttonValue="Assign Task" onClickFunc={() => assignTask(subordinate.id)}></Employee>
            })}

    </div>
}

export default EmployeeDetails
