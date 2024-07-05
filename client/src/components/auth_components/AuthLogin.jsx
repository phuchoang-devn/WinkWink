import './styles/authLogin.scss'
import {useState, useCallback} from "react";
import { useAuth } from '../../context_providers/auth_provider';
import {useNavigate} from "react-router-dom";


const AuthLogin = ({ setShowDialog }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const navigateMain = () => navigate("/")

    const handleClick = useCallback(() => {
        setShowDialog(false);
    }, [setShowDialog]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResult = await login(email, password);
        if (!loginResult.isSuccessful) {
            setError(loginResult.message);
        } else {
            navigateMain();
        }
    };

    return (
        <div className="logIn">
            <i className="ri-eye-close-line" onClick={handleClick}></i>
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
                    <button className='submit-btn' type="submit">Submit</button>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    );
};


export default AuthLogin;