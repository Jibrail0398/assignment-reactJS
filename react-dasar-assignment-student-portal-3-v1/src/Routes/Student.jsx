import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Student = () => {

    const [loading,setLoading] = useState(true);
    const [students,setStudents] = useState(null);
    const [dataChanged,setDataChanged] = useState(false);
    const [filteredStudents,setFiltered] = useState([]);
    const navigate = useNavigate();

    async function getStudents(){
    
        try{

            const response = await fetch('http://localhost:3001/student');
            const data = await response.json();
            setStudents(data);
            setFiltered(data)
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
        }
        
    }

    useEffect(()=>{
        (async function() {
            await getStudents();
        })();
    },[])

    useEffect(()=>{
        (async function() {
            await getStudents();
        })();
    },[dataChanged])

    async function handleDelete(id){
        try{
            const response = await fetch(`http://localhost:3001/student/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            setDataChanged(!dataChanged);
            return await response;
            
        }catch(error){
            console.log(error)
        }
    }

    const handleFilterChange = async (event) => {
        const selectedFaculty = event.target.value;
        if (selectedFaculty !== "All"){
            let filteredStudent = students.filter(student=>student.faculty === selectedFaculty);
            setFiltered(filteredStudent);
            
        }else{
            setFiltered(students);
        }

        
        
    };

    function toEditStudent(id){
        navigate(`/student/${id}`);
    }

    if(loading){
        return <p>Loading ...</p>
    }else{
        
        return (
        <>
            <NavBar/>

            <select name="filter" data-testid="filter" className="m-4 relative left-3/4" onChange={handleFilterChange} >
                <option >All</option>
                <option >Fakultas Ekonomi</option>
                <option >Fakultas Ilmu Sosial dan Politik</option>
                <option >Fakultas Teknik</option>
                <option >Fakultas Teknologi Informasi dan Sains</option>
            </select>

            <div className="flex justify-center w-full mt-4 ">
                <table id="table-student" className="w-full ml-4" >
                    <thead className="text-bold" >
                        <tr>
                            <th className="py-4 mx-2 text-left" >No</th>
                            <th className="py-4 mx-2 text-left" >Full Name</th>
                            <th className="py-4 mx-2 text-left" >Faculty</th>
                            <th className="py-4 mx-2 text-left" >Program Study</th>
                            <th className="py-4 mx-2 text-left" >Option</th>
                        </tr>
                    </thead>
                    <tbody >
                        {filteredStudents.map((student,index) => (
                            <tr key={index} className="student-data-row cursor-pointer" >
                                <td className="py-4 text-left" onClick={()=>toEditStudent(student.id)} >{index+1}</td>
                                <td className="py-4 text-left" onClick={()=>toEditStudent(student.id)} >{student.fullname}</td>
                                <td className="py-4 text-left" onClick={()=>toEditStudent(student.id)} >{student.faculty}</td>
                                <td className="py-4 text-left" onClick={()=>toEditStudent(student.id)} >{student.programStudy}</td>
                                <td className="py-4 text-left text-red-500" ><button data-testid={`delete-${student.id}`} onClick={() => handleDelete(student.id)}>delete</button></td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </>
        
        )
    }
};

export default Student;
