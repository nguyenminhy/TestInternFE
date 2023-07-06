import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UsersContext';
import { Alert } from 'react-bootstrap';

function PrivateRoutes(prop) {
    const { user, loginContext } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You don't have permission to access this route.</p>
                </Alert>
            </>
        );
    }

    return <>{prop.children}</>;
}

export default PrivateRoutes;
