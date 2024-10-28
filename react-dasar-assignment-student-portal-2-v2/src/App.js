import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
    
    
    const [studentsData,setStudentsData] = useState([]);
    const [loading,setLoading] = useState(false);
    

    useEffect(()=>{
        setLoading(true);
        fetchData() ;
    },[]);

    function fetchData(){
        fetch(`http://localhost:3001/student`)
            .then((response)=>response.json())
            .then((data)=>{
                setStudentsData(data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false)
            })
    }

    async function handleDelete(id){
        try{
            const response = await fetch(`http://localhost:3001/student/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            setStudentsData((prevData) => prevData.filter((student) => student.id !== id));
            return await response;
            
        }catch(error){
            console.log(error)
        }
    }
    const addStudent = async (newStudent) => {
        setLoading(true);
        try {
            setStudentsData((prevData) => [...prevData, newStudent]);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <Form onAddStudent={addStudent} />
            {loading===true?<p>Loading ...</p>:<Table students={studentsData} onDelete={handleDelete}/>}
            
        </>
    );
};

export default App;
