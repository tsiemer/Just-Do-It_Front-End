import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
    if(isAuthenticated){
        return children;
    } else {
        return <Navigate to={redirectPath}/>;
    }
};

export default PrivateRoute;