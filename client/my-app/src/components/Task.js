function Task(props) {

    return <div>
        <p>
            <label> {props.data.taskText}</label>
            &emsp;&emsp;&emsp;&emsp;&emsp;
            <label> {props.data.dueDate}</label>
        </p>
    </div >
}

export default Task