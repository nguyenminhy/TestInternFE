import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete } = props;

    const handleDeleteUser = () => {};

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="container">
                            <>
                                This action don't undone! Do you want delete user? <br /> Email: "
                                <b>{dataUserDelete.email}</b>"
                            </>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Confirm delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
