import './styles/AuthLogin.css'
import {useState} from "react";
import { useAuth } from '../../static/js/context_providers/auth_provider';


const AuthLogin = ({ setShowLogin }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleClick = () => {
        setShowLogin(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResult = await login(email, password);
        if(!loginResult.isSuccessful) setError(loginResult.message)
    };

    return (
        <div className="logIn">
            <button type="button" onClick={handleClick}>
                <i className="ri-eye-close-line"></i>
            </button>
            <div className="login__info">
                <h2>Log In</h2>
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
                    <button className="form-btn" type="submit">Submit</button>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    );
};


export default AuthLogin;