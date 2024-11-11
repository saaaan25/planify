import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element: Element }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Element />;
};

export default PrivateRoute;
