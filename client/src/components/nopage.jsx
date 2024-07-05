import { useAuth } from '../context_providers/auth_provider';
import '../index.scss'
import { useNavigate } from 'react-router-dom';

const NoPage = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    return(
        <div className='not-found'>
            <h1>404 Error</h1>
            <h3>
                { 
                isLoggedIn ?
                `Your wink didn't reach this page.
                But don't worry, many others are waiting for your wink!
                Back to the homepage!`
                : `Your wink didn't reach this page.
                But don't worry, many others are waiting for your wink!
                Fuck off!`
            }
            </h3>
            <button onClick={() => navigate('/')}>Back to {isLoggedIn ? "Home" : "Log In"}</button>
        </div>
    );
}

export default NoPage;