import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllApi } from '../services/userService';

function TableUsers(prop) {
    const [listUsers, setListUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchAllApi();
        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }
    };

    return (
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
    );
}

export default TableUsers;
