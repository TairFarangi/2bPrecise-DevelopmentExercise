function Employee({ employee, buttonValue, onClickFunc }) {

    return <div>

        <h3 >

            <label> {employee.firstName}</label>
            <label> {employee.lastName}</label>
            &emsp;&emsp;

            <label style={{ textAlign: "center" }}> {employee.position}</label>
            &emsp;&emsp;

            {/* <Link to="/details"> */}
            <button style={{ backgroundColor: "#2190c5", fontSize: "20px" }} onClick={() => onClickFunc(employee.id)}>
                {buttonValue}
            </button>

            {/* </Link> */}
        </h3>
    </div >
}

export default Employee

