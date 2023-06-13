import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllApi } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import _ from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';

function TableUsers(prop) {
    const [listUsers, setListUser] = useState([]);
    // const [totalUser, setTotalUser] = useState(0);
    const [totalPages, setToltalPages] = useState(0);

    const [isShowModalAddNewUser, setIsShowAddNewUser] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalConfirmDelete, setIsShowModalConfirmDelete] = useState(false);

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const handleClose = () => {
        setIsShowAddNewUser(false);
        setIsShowModalEdit(false);
        setIsShowModalConfirmDelete(false);
    };

    const handleShow = () => {
        setIsShowAddNewUser(true);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUsers]);
    };

    const handleEditUserFromTable = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.name;

        setListUser(cloneListUsers);
    };

    const handleUpdateUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleDelete = (user) => {
        setIsShowModalConfirmDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFormmodal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUser(cloneListUsers);
    };
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
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
                        <th>
                            <div className="sort-header">
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => {
                                            handleSort('desc', 'id');
                                        }}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        onClick={() => {
                                            handleSort('asc', 'id');
                                        }}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>First Name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => {
                                            handleSort('desc', 'first_name');
                                        }}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        onClick={() => {
                                            handleSort('asc', 'first_name');
                                        }}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
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
                                    <td>
                                        <button className="btn btn-warning mx-2" onClick={() => handleUpdateUser(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                                            Delete
                                        </button>
                                    </td>
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
                title="Add new User"
            />
            <ModalAddNewUser
                show={isShowModalEdit}
                handleClose={handleClose}
                handleEditUserFromTable={handleEditUserFromTable}
                // handleUpdateTable={handleUpdateTable}
                dataUserEdit={dataUserEdit}
                title="Update new User"
            />
            <ModalConfirm
                show={isShowModalConfirmDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFormmodal={handleDeleteUserFormmodal}
            />
        </>
    );
}

export default TableUsers;
