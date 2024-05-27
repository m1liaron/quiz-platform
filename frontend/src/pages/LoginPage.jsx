import LoginForm from "../components/forms/LoginForm.jsx";
import bgImage from '../assets/images/background.jpeg'
import peopleImage from '../assets/images/mil_with_civ.png'
import {useEffect, useState} from "react";

const LoginPage = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 1000);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className="vh-100 vw-100 d-flex justify-content-center align-items-center"
            style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="d-flex gap-5">
                {isWideScreen && (
                        <div>
                            <img src={peopleImage} alt="Переможемо разом"/>
                            <div style={{backgroundColor: '#1F314A'}} className="p-2 text-center">
                                <p className="text-white" style={{fontSize: 30}}>
                                    Переможемо разом!
                                </p>
                            </div>
                        </div>

                )}
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;