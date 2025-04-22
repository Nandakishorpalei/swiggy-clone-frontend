import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Loader } from "../../UI-Components/Loader/Loader";
import { Login } from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setShowLoginModal } from "../../store/slices/Auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(setShowLoginModal(true));
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <Login />
        {children}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
