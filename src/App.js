import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import ModalAddNewUser from './components/ModalAddNewUser';
import TableUsers from './components/TableUsers';
import { Container } from 'react-bootstrap';

function App() {
    const [isShowModalAddNewUser, setIsShowAddNewUser] = useState(false);

    const handleClose = () => {
        setIsShowAddNewUser(false);
    };

    const handleShow = () => {
        setIsShowAddNewUser(true);
    };

    return (
        <div className="app-container">
            <Header />
            <Container>
                <div className="my-3 d-flex justify-content-between">
                    <span>List Users:</span>
                    <button className="btn btn-primary" onClick={handleShow}>
                        Add user
                    </button>
                </div>
                <TableUsers />
            </Container>
            <ModalAddNewUser show={isShowModalAddNewUser} handleClose={handleClose} />
        </div>
    );
}

export default App;
