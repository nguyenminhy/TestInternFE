import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser, putUpdateUser } from '../services/userService';
import { toast } from 'react-toastify';
function ModalAddNewUser(props) {
    const { show, handleClose, handleUpdateTable, title, dataUserEdit, handleEditUserFromTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const nameRef = useRef();
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
            // Error
            toast.error('An Error...');
        }
    };
    const handleUpdateUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            // Success
            handleEditUserFromTable({
                name: name,
                id: dataUserEdit.id,
            });
            toast.success('Update user success!');
        } else {
            // Error
            console.log('Error:');
        }
        handleClose();
    };
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
        // eslint-disable-next-line
    }, [dataUserEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
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
                                            ref={nameRef}
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
                    <Button variant="primary" onClick={dataUserEdit ? handleUpdateUser : handleSaveUser}>
                        {dataUserEdit ? 'Update user' : 'Save user'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;
