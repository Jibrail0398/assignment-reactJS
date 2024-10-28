import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    
    let navigate = useNavigate();


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
        const profilePicture = formData.get('profile-picture');
        const address = formData.get('address');
        const birthDate = formData.get('birthDate');
        const gender = formData.get('gender');
        const phoneNumber = formData.get('phone-number');
        const programStudy = formData.get('programStudy');
        const faculty = inputFacultyPrody(programStudy);

        const Data ={
            fullname:fullname,
            profilePicture:profilePicture,
            address:address,
            birthDate:birthDate,
            gender:gender,
            phoneNumber : phoneNumber,
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
            const data = await response.json();
            
        }catch(error){
            console.log(error);
        }
        navigate("/student");
    }

    return (
        <>
            <NavBar/>
            <h1 className="text-3xl m-4" >Add Student</h1>
            <form id='form-student' onSubmit={handleSubmit} className="m-4" >
                <label className="block text-2xl font-semibold" >Fullname</label>
                <input type="text" id="input-name"  name="fullname" data-testid="name" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" ></input>
                <label className="block text-2xl font-semibold" >Profil Picture</label>
                <input type="text" name="profile-picture" data-testid="profilePicture" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"  />
                <label className="block text-2xl font-semibold" >Address</label>
                <input type="text" name="address" data-testid="address" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" />
                <label className="block text-2xl font-semibold" >Phone Number</label>
                <input type="text" name="phone-number" data-testid="phoneNumber" className="w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"  />
                <label className="block text-2xl font-semibold" >Birth Date</label>
                <input type="date" id="input-date"  name="birthDate" data-testid="date" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"  />
                <label className="block text-2xl font-semibold"  >Gender</label>
                <select id="input-gender"  name="gender" data-testid="gender" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4" >
                    <option >Male</option>
                    <option >Female</option>
                </select>
                <label className="block text-2xl font-semibold" >Program Study</label>
                <select id="input-prody"  name="programStudy" data-testid="prody" className="text-xl w-full py-1 rounded-lg border-2 border-indigo-400 focus:border-blue-800 focus:outline-none my-4"   >
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
                <input type="submit"  id="add-btn" data-testid="add-btn" className=" block  p-2 rounded text-white text-xl w-full bg-sky-400 mx-auto"  />
            </form>
        </>
    );
};

export default AddStudent;
