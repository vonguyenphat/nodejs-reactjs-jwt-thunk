import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../Assets/Spinner';


// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { isLoggedIn, isDataFetched } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!isDataFetched) {
            return;
        }
    }, [isLoggedIn, navigate, isDataFetched])
    if (!isLoggedIn) {
        navigate('/login');
        return <Spinner/>
    }
    return (
        <>{children}</>
    )


}
export default PrivateRoute;