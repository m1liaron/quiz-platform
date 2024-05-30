import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const BackArrow = () => {

    const navigate = useNavigate();
    return (
        <FaArrowLeft style={{cursor:'pointer'}} size={30} color="#000" onClick={() => navigate(-1)}/>
    );
};

export default BackArrow;