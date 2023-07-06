import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import './App.scss';
import Header from './components/Header';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UsersContext';
import AppRoutes from './Routes/AppRoutes';

function App() {
    const { user, loginContext } = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </>
    );
}

export default App;
