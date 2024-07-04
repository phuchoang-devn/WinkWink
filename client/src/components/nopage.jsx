import '../index.scss'
import { useNavigate } from 'react-router-dom';

const NoPage = (props) => {
    const navigate = useNavigate();
    return(
        <div className='not-found'>
            <h1>404 Error</h1>
            <h3>Your wink didn't reach this page.
                But don't worry, many others are waiting for your wink!
                Back to the homepage!</h3>
            <button onClick={() => navigate('/')}>Back Home</button>
        </div>
    );
}

export default NoPage;