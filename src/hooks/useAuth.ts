import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/signin");
      return;
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        navigate("/auth/signin");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/auth/signin");
    }
  }, [navigate]);

  return true;
}
