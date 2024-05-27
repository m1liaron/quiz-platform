import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {register, selectUser} from "../../redux/userSlice.js";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ModalTitle} from "react-bootstrap";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [passwordType, setPasswordType] = useState("password");
    const {user, loading , error} = useSelector(selectUser);

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

    const navigate = useNavigate();
    const onRegister = (values) => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        dispatch(register(userData));
        navigate('/');
    }

    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Ім'я обов'язкове").min(3).max(20),
        email: Yup.string().email("Пошта не валідна").required("Пошта обов'язкова"),
        password: Yup.string().required("Пароль обов'язковий").min(5, 'Повинно бути не менше 5 символів'),
    })

    return (
        <div>
            <ToastContainer/>
            <Formik
                initialValues={initialValues}
                onSubmit={onRegister}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Form className="p-5 bg-white" style={{width: '500px', borderRadius: 5}} onSubmit={formik.handleSubmit}>
                        <ModalTitle className='text-center'>Реєстрація</ModalTitle>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Ім`я
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Уввідіть ім'я"
                                className="form-control"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger"/>
                        </div>

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
                            <ErrorMessage name="email" component="div" className="text-danger"/>
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
                                        <FaEyeSlash color="#000" size={30} style={{cursor: "pointer"}}
                                                    onClick={() => setPasswordType('text')}/>
                                    ) : (
                                        <FaRegEye color="#000" size={30} style={{cursor: "pointer"}}
                                                  onClick={() => setPasswordType('password')}/>
                                    )
                                }
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger"/>
                        </div>

                        <NavLink to="/login">
                            Маєте акаунт?
                        </NavLink>

                        <Button
                            type="submit"
                            className="btn btn-primary w-50 d-block mx-auto"
                            style={{background: 'linear-gradient(180deg, #0057B8, #FEDF00)'}}
                        >
                            Увійти
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;