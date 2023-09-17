import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute() {
    const auth = useSelector(x => x.auth.value);

    if (!auth) {
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }
    return <Outlet />;
}