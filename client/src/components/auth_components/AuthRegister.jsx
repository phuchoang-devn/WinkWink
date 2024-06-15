import {useCallback, useState} from "react";
import './styles/authRegister.css'

const AuthRegister = ({ setShowLogin,isSignUp}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    console.log(email, password, confirmPassword);
    const handleClick = useCallback(() => {
        setShowLogin(false);
    }, [setShowLogin]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError("Password needs it to match")
            }
            console.log('make a post-request to our database')
        } catch (error) {
            console.log(error)
        }
    }, [isSignUp, password, confirmPassword]);

    return (
        <div className="register">
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
                    <button className="form-btn" type="submit">Submit</button>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    );
};

export default AuthRegister;