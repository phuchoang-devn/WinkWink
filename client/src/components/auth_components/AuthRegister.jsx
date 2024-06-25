<<<<<<< HEAD
import { useCallback, useState } from "react";
import './styles/authRegister.css'
=======
import {useCallback, useState} from "react";
import './styles/authLogin.scss'
>>>>>>> origin/M_Sprint08

const AuthRegister = ({ setShowLogin, isSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleClick = useCallback(() => {
        setShowLogin(false);
    }, [setShowLogin]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError("Password needs it to match!")
                return
            }

            if (password.length < 8) {
                setError("Password must contain at least 8 characters!")
                return
            }

            let data = { email, password };

            const response = await fetch(`/api/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok){
                console.log("Register succesful")
            } else if(response.status === 400) {
                setError(await response.text())
            }

        } catch (error) {
            console.log(error)
        }
    }, [isSignUp, password, confirmPassword]);

    return (
        <div className="logIn">
            <i className="ri-eye-close-line" onClick={handleClick}></i>
            <div className="login__info">
                <h2>{isSignUp ? "Create an account" : "Log In"}</h2>
                <p>
                    By clicking accept all cookies you agree to the storing of cookies on
                    your device to enhance site
                </p>
                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <input
                        type="password-check"
                        id="password-check"
                        name="password-check"
                        placeholder="Confirm password"
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    );
};

export default AuthRegister;