import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser} from "../../redux/userSlice.js";
import {useEffect} from "react";

const Header = () => {
    const {user} = useSelector(selectUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div
            className='w-100 h-25 p-4 justify-content-between d-flex align-items-center'
            style={{
                backgroundColor: '#78B8F3'
            }}
        >
            <h1 className='text-white'>Вікторини</h1>
            {user ? (
                <NavLink to='/profile' className='bg-white p-2' style={{borderRadius:100}}>
                    <img
                        style={{width:50}}
                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
                        alt="Профіль"
                    />
                </NavLink>
            ) : (
                <NavLink to='/login'>
                    <h3>Увійти</h3>
                </NavLink>
            )}
        </div>
    );
};

export default Header;