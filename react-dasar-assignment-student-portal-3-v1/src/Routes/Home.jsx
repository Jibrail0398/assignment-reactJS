import { Link } from "react-router-dom";

const Home = () => {
    return( 
    <>
        <Link to="/student" >
            <div className="flex justify-center items-center h-screen">
                <div className=" text-3xl" >Student Portal</div>
                <div class="m-4 h-32 border-l-2 border-black"></div>
                <button data-testid="student-btn" className=" p-4 bg-slate-700 rounded text-white" >All Student</button>
            </div>
        </Link>
    </> )
};

export default Home;
