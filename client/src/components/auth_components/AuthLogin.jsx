import './styles/AuthLogin.css'
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { accounts } from "../../fakeDB";


const AuthLogin = ({ setShowLogin,isSignUp}) => {
    const navigate = useNavigate(); // Hook für die Navigation
    const handleClick = () => {
        setShowLogin(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError("Password needs it to match")
            }
            else {
                const user = accounts.find((acc) => acc.email === email);

                if (user) {
                    if (user.password === password) {
                        navigate("/nopage");
                    } else {
                        setError("Incorrect password");
                    }
                } else {
                    setError("User not found");
                }
            }
            console.log('make a post-request to our database')
        }
        catch(error){
            console.log(error)
        }
    };

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

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