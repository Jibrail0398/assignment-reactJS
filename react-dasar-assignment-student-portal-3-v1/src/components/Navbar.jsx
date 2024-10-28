// TODO: answer here

import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <nav className="flex gap-8 bg-slate-700 text-slate-50" >
                <Link  className="flex-1 text-3xl m-2" to={"/"} data-testid="home-page">
                    Student Portal
                </Link>
                <Link className="text-xl self-center" to={"/student"} data-testid="student-page">
                    All Student
                </Link>
                <Link className="text-xl mr-2 self-center" to={"/add"} data-testid="add-page">
                    Add Student
                </Link>
            </nav>
        </>
    );
};

export default NavBar;
