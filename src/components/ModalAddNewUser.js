import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddNewUser(props) {
    const { show, handleClose } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = () => {
        console.log('check: ', 'name ', name, 'Job ', job);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="container">
                            <div className="row pb-1">
                                <div className="col-2 align-self-start">
                                    <div className="col-auto">
                                        <label className="col-form-label">Name:</label>
                                    </div>
                                </div>
                                <div className="col-8 align-self-start">
                                    <div className="col-auto">
                                        <input
                                            type="text"
                                            id="inputName"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 align-self-start">
                                    <div className="col-auto">
                                        <label className="col-form-label me-3">Job:</label>
                                    </div>
                                </div>
                                <div className="col-8 align-self-start">
                                    <div className="col-auto">
                                        <input
                                            type="text"
                                            id="inputJob"
                                            className="form-control"
                                            value={job}
                                            onChange={(e) => setJob(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save user
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;
