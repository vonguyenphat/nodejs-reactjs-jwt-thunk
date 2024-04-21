import { Routes, Route } from "react-router-dom";
import Login from '../Pages/Login/Login.jsx';
import SignUp from "../Pages/SignUp/SignUp.jsx";
import Profile from "../Pages/Profile/Profile.jsx";
import PrivateRoute from "./privateRouter.jsx";
// import requireAuth from "./checkAuth.js";
const AppRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />

            
            <Route path="/profile" element={
                <PrivateRoute>
                    {<Profile/>}
                </PrivateRoute>
            }>
            </Route>
        </Routes>
    )
}
export default AppRouter;