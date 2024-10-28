import { useParams,useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import Navbar from "../components/Navbar";


const EditStudent = () => {
    const { id } = useParams();
    const [biodata,setBiodata] = useState([]);
    const [loading,setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(()=>{
        fetchStudent(id);
    },[id]);

    function inputFacultyPrody(prody) {
        if (["Ekonomi", "Manajemen", "Akuntansi"].includes(prody)) {
            return "Fakultas Ekonomi";
        } else if (["Administrasi Publik", "Administrasi Bisnis", "Hubungan Internasional"].includes(prody)) {
            return "Fakultas Ilmu Sosial dan Politik";
        } else if (["Teknik Sipil", "Arsitektur"].includes(prody)) {
            return "Fakultas Teknik";
        } else if (["Matematika", "Fisika", "Informatika"].includes(prody)) {
            return "Fakultas Teknologi Informasi dan Sains";
        } else {
            return ""; 
        }
    }

    function fetchStudent(id){
        fetch(`http://localhost:3001/student/${id}`)
            .then((response)=>response.json())
            .then((data)=>{
                setBiodata(data);
                setLoading(false);
                
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false)
            })
    }

    function handlechange(e) {
        let updatedBiodata = { ...biodata, [e.target.name]: e.target.value };
    
        
        if (e.target.name === "programStudy") {
            let studentFaculty = inputFacultyPrody(e.target.value);
            updatedBiodata = { ...updatedBiodata, faculty: studentFaculty };
        }
    
        setBiodata(updatedBiodata);
    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        formData.forEach((value,key)=>{
            setBiodata({...biodata,[key]:value})
        })
        
        try{
            const response = await fetch(`http://localhost:3001/student/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    
                    body:JSON.stringify(biodata)
                }
            )
            const data = await response.json()
        }catch(e) {
            console.log(e)
        }
        
        navigate("/student");
        
    }

    if(loading===true){

        return (
            <>
                <Navbar/>
                <p>Loading ...</p>
            </>
    )
    }else{
        return (
            <>
                <Navbar/>
                <div className="flex w-full m-4" >
    
                    <div className=" flex-2 mt-4" >
                        <img src={biodata.profilePicture} width="200" alt="Student Picture" />
                    </div>
                    <div className="flex-1 mr-4">
                        <form  id='form-student' onSubmit={handleSubmit} className="m-4" >
                        <label className="block text-2xl font-semibold" >Fullname</label>
                        <input type="text" value={biodata.fullname} onChange={handlechange} id="input-name"  name="fullname" data-testid="name" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" ></input>
                        <label className="block text-2xl font-semibold" >Address</label>
                        <input type="text" name="address" value={biodata.address} onChange={handlechange} data-testid="address" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" />
                        <label className="block text-2xl font-semibold" >Phone Number</label>
                        <input type="text" name="phoneNumber" value={biodata.phoneNumber} onChange={handlechange} data-testid="phoneNumber" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"  />
                        <label className="block text-2xl font-semibold" >Birth Date</label>
                        <input type="date" id="input-date" value={biodata.birthDate} onChange={handlechange}  name="birthDate" data-testid="date" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"  />
                        <label className="block text-2xl font-semibold"  >Gender</label>
                        <select id="input-gender"  name="gender" value={biodata.gender} onChange={handlechange}  data-testid="gender" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" >
                            <option >Male</option>
                            <option >Female</option>
                        </select>
                        <label className="block text-2xl font-semibold" >Program Study</label>
                        <select id="input-prody" value={biodata.programStudy} onChange={handlechange}  name="programStudy" data-testid="prody" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"   >
                            <option >Ekonomi</option>
                            <option >Manajemen</option>
                            <option >Akuntansi</option>
                            <option >Administrasi Publik</option>
                            <option >Administrasi Bisnis</option>
                            <option >Hubungan Internasional</option>
                            <option >Teknik Sipil</option>
                            <option >Arsitektur</option>
                            <option >Matematika</option>
                            <option>Fisika</option>
                            <option>Informatika</option>
                        </select>
                        <input type="submit" value="Edit student"  id="add-btn" data-testid="edit-btn" className=" block  p-2 rounded text-white text-xl w-full bg-sky-400 mx-auto"  />
                    </form>
                    </div>
                </div>
                
            </>
        );
    }

    
};

export default EditStudent;
