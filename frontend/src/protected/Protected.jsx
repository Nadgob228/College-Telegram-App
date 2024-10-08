import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({isAuth}) => {
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
