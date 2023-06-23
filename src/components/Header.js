import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../Context/UsersContext';

function Header(props) {
    const { logout, user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logout success!');
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logoApp} width="30" height="30" className="d-inline-block align-top" alt="logo" />
                    <span>Logo</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {((user && user.auth) || window.location.pathname === '/') && (
                        <>
                            <Nav className="me-auto">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>

                                <NavLink className="nav-link" to="/users">
                                    Manage Users
                                </NavLink>
                            </Nav>
                            <Nav>
                                {user.auth === true && (
                                    <span className="nav-link" style={{ color: '#fff' }}>
                                        Welcome {user.email}
                                    </span>
                                )}

                                <NavDropdown title="Setting" id="collasible-nav-dropdown">
                                    {user && user.auth === true ? (
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    ) : (
                                        <NavLink className="dropdown-item" to="/login">
                                            Login
                                        </NavLink>
                                    )}
                                </NavDropdown>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
