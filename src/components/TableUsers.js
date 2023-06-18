import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import _, { debounce } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';

import { fetchAllApi } from '../services/userService';
import ModalAddNewUser from './ModalAddNewUser';
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

    // eslint-disable-next-line
    const [sortBy, setSortBy] = useState('asc');
    // eslint-disable-next-line
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
    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
            setListUser(cloneListUser);
        } else {
            getUsers(1);
        }
    }, 500);

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

    const csvData = [
        ['firstname', 'lastname', 'email'],
        ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
        ['Raed', 'Labes', 'rl@smthing.co.com'],
        ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
    ];

    return (
        <>
            <div className="my-3 add-new">
                <span>List Users:</span>
                <div className="groud-btns">
                    <label className="btn btn-warning" htmlFor="input-file">
                        <i class="fa-solid fa-file-import"></i> Import
                        <input id="input-file" type="file" hidden />
                    </label>

                    <CSVLink data={csvData} filename={'users'} className="btn btn-primary">
                        <i className="fa-solid fa-file-arrow-down"></i>
                        Export
                    </CSVLink>
                    <button className="btn btn-primary" onClick={handleShow}>
                        <i className="fa-solid fa-circle-plus"></i>
                        Add user
                    </button>
                </div>
            </div>
            <div className="cl-4 my-3">
                <input placeholder="Search by email..." onChange={(e) => handleSearch(e)} />
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
