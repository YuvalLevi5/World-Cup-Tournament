import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { worldCupService } from '../services/world-cup-service'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({ username: "", password: "" })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (localStorage.getItem('worldcup-app-user')) {
            navigate("/");
        }
    }, [])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = values
        if (validateForm()) {
            const data = await worldCupService.login(username, password)
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    'worldcup-app-user',
                    JSON.stringify(data.user)
                );

                navigate("/");
            }
        }
    }

    return (
        <>
            <section className='form-container'>
                <div className="bla">

                    <form className="login-form" action="" onSubmit={(event) => handleSubmit(event)}>
                        <h2>FIFA World Cup Qatar 2022</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                            min="3"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit" className="btn">Login</button>
                        <span className="btn register">
                            <NavLink to="/register"> Don't have an account ? Create One</NavLink>
                        </span>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Login