import "../style.css"


const Table = (props) => {
    
    const students = props.students || [];

    return (
        <>
            <table id="table-student">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Faculty</th>
                        <th>Program Study</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr>
                            <td>{student.id}</td>
                            <td>{student.fullname}</td>
                            <td>{student.birthDate}</td>
                            <td>{student.gender}</td>
                            <td>{student.faculty}</td>
                            <td>{student.programStudy}</td>
                            <td><button>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;