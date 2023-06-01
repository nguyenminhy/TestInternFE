import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllApi } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';

function TableUsers(prop) {
    const [listUsers, setListUser] = useState([]);
    // const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setToltalPages] = useState(0);
    const [isShowModalAddNewUser, setIsShowAddNewUser] = useState(false);

    const handleClose = () => {
        setIsShowAddNewUser(false);
    };

    const handleShow = () => {
        setIsShowAddNewUser(true);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUsers]);
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllApi(page);
        if (res && res.data) {
            setListUser(res.data);
            // setTotalUser(res.total);
            setToltalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    return (
        <>
            <div className="my-3 d-flex justify-content-between">
                <span>List Users:</span>
                <button className="btn btn-primary" onClick={handleShow}>
                    Add user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNewUser
                show={isShowModalAddNewUser}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
        </>
    );
}

export default TableUsers;
