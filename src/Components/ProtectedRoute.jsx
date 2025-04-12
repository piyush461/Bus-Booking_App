import { Navigate } from "react-router-dom";

function ProtectedRoute({children, allowedRoles}) {
    const getAuthUser = ()=>{
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    };

    const user = getAuthUser();

    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to="/adminlogin"/>
    }

    return children;
}

export default ProtectedRoute