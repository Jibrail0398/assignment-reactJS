
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    let navigate = useNavigate();

    return (
        <div className="flex justify-center items-center flex-col h-screen m-4">
            <h1 className="text-2xl m-4" >404 | Not Found</h1>
            <button data-testid="back" className="bg-sky-900 text-white rounded p-4" onClick={()=>navigate("/student")} >Take Me Back</button>
        </div>
    );
};

export default NotFound;
