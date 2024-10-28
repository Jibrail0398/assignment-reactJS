import { useState } from "react";

import '../style.css'
const Form = ({onAddStudent}) => {

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
        
        const formData = new FormData(e.target);

        const fullname = formData.get('fullname');
        const birthDate = formData.get('birthDate');
        const gender = formData.get('gender');
        const programStudy = formData.get('programStudy');
        const faculty = inputFacultyPrody(programStudy);

        const Data ={
            fullname:fullname,
            birthDate:birthDate,
            gender:gender,
            faculty:faculty,
            programStudy:programStudy
        }
        

        try{
            const response = await fetch("http://localhost:3001/student",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Data)
            });
            
            onAddStudent(Data);
        
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <form id='form-student' onSubmit={handleSubmit} >
                <label  >Fullname</label>
                <input type="text" id="input-name"   name="fullname" data-testid="name" ></input>
                <label >Birth Date</label>
                <input type="date" id="input-date"  name="birthDate" data-testid="date" />
                <label  >Gender</label>
                <select id="input-gender"  name="gender" data-testid="gender">
                    <option >Male</option>
                    <option >Female</option>
                </select>
                <label >Program Study</label>
                <select id="input-prody"  name="programStudy" data-testid="prody"  >
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

