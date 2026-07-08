import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../services/authServices";
import { setUser, clearUser } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

// ✅ Matches exact backend response
interface CheckAuthResponse {
  _id: string;
  email: string;
  is_verified: boolean;
  balance: number;
  first_name?: string;
  last_name?: string;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const storeToken = useSelector((state: RootState) => state.auth.token);
  const [status, setStatus] = useState<"checking" | "ok" | "fail">("checking");

  useEffect(() => {
    const verify = async () => {
      const token = storeToken || localStorage.getItem("token");

      if (!token) {
        setStatus("fail");
        return;
      }

      try {
        const data = await checkAuth(token) as CheckAuthResponse;

        dispatch(setUser({
          id: data._id,             // ✅ _id → id
          email: data.email,        // ✅ flat response
          token,
          is_verified: data.is_verified,
          balance: data.balance,
          first_name: data.first_name,
          last_name: data.last_name,
        }));

        setStatus("ok");
      } catch {
        localStorage.removeItem("token");
        dispatch(clearUser());
        setStatus("fail");
      }
    };

    verify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "checking") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{
          width: 28,
          height: 28,
          border: "2px solid rgba(255,255,255,0.15)",
          borderTopColor: "#7c3aed",
          borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.7s linear infinite",
        }} />
      </div>
    );
  }

  if (status === "fail") {
    return <Navigate to="/auth?mode=signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;