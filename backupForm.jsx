import { useState } from "react";

import '../style.css'
const Form = ({onAddStudent}) => {

    const [data,setData] = useState({
        fullname:"",
        birthDate:'',
        gender:'',
        faculty:'',
        programStudy:''
    });

    function handleInput(e){
        const {name,value} = e.target;
        let updatedFaculty = data.faculty;

        if(name === "programStudy"){
            updatedFaculty = inputFacultyPrody(value);
        }
        setData({
            ...data,
            [name]:value,
            faculty:updatedFaculty
        });
        
    }

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

    async function handleSubmit(e){
        e.preventDefault();
        // dataWasChanged();
        try{
            const response = await fetch("http://localhost:3001/student",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            const theNewStudent = await response.json();
            onAddStudent(theNewStudent);
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <form id='form-student' onSubmit={handleSubmit} >
                <label  >Fullname</label>
                <input type="text" id="input-name"  onChange={handleInput} name="fullname" data-testid="name" ></input>
                <label   >Birth Date</label>
                <input type="date" id="input-date" onChange={handleInput} name="birthDate" data-testid="date" />
                <label  >Gender</label>
                <select id="input-gender" onChange={handleInput} name="gender" data-testid="gender">
                    <option >Male</option>
                    <option >Female</option>
                </select>
                <label >Program Study</label>
                <select id="input-prody" onChange={handleInput} name="programStudy" data-testid="prody"  >
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
                <input type="submit"  id="add-btn" data-testid="submit"  />
            </form>
        </>
    );
};

export default Form;

