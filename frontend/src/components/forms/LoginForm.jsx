import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser} from "../../redux/userSlice.js";
import {ModalTitle} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [passwordType, setPasswordType] = useState("password");
    const dispatch = useDispatch();
    const {loading , error, user} = useSelector(selectUser);

    const navigate = useNavigate();

    useEffect(() => {
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        })
    }, [error]);

    const onLogin = (values) => {
            const userData = {
                email: values.email,
                password: values.password,
            }
            dispatch(login(userData));
            navigate("/");
    }

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Пошта не валідна").required("Пошта обов'язкова"),
        password: Yup.string().required("Пароль обов'язковий").min(5, 'Повинно бути не менше 5 символів'),
    })

    return (
        <div>
            <ToastContainer />
            <Formik
                initialValues={initialValues}
                onSubmit={onLogin}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Form className="p-5 bg-white" style={{width: '500px', borderRadius:5}} onSubmit={formik.handleSubmit}>
                        <ModalTitle className='text-center'>Вхід</ModalTitle>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Пошта
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Уввідіть пошту"
                                className="form-control"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Пароль
                            </label>
                            <div className='d-flex align-items-center gap-2'>
                                <Field
                                    type={passwordType}
                                    id="password"
                                    name="password"
                                    placeholder="Уввідіть пароль"
                                    className="form-control"
                                    autoComplete="current-password"
                                />
                                {
                                    passwordType === "password" ? (
                                        <FaEyeSlash color="#000" size={30} style={{cursor: "pointer"}} onClick={() => setPasswordType('text')}/>
                                    ) : (
                                        <FaRegEye color="#000" size={30} style={{cursor: "pointer"}} onClick={() => setPasswordType('password')}/>
                                    )
                                }
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <NavLink to="/register">
                            Не маєте акаунта?
                        </NavLink>

                        <Button
                            type="submit"
                            className="btn btn-primary w-50 d-block mx-auto"
                            style={{ background: 'linear-gradient(180deg, #0057B8, #FEDF00)'}}
                        >
                            Увійти
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;