import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/userService';
import { toast } from 'react-toastify';
function ModalAddNewUser(props) {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        console.log('check: ', res);
        if (res && res.id) {
            // success
            handleClose();
            setName('');
            setJob('');
            toast.success('A User created success!');
            handleUpdateTable({ first_name: name, id: res.id });
        } else {
            toast.error('An Error...');
        }
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
