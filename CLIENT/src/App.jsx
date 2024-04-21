import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Routers/appRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { fetchUserFromAt } from './Redux/Slice/AuthSlice';
import { Spinner } from './Assets/Spinner';
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (window.location.pathname !== "/login" && window.location.pathname !== "/signUp") {
      dispatch(fetchUserFromAt());
    }
    if (window.location.pathname === "/login" || window.location.pathname === "/signUp") {
      return;
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BrowserRouter>
            <AppRouter></AppRouter>
          </BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="bounce"
          />
        </>
      )}
    </>
  );
}

export default App;
