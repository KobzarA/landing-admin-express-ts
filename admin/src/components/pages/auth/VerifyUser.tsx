import { useNavigate } from "react-router-dom";
import { fetchCheckAuth } from "../../../api/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";

const VerifyUser = () => {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(fetchCheckAuth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (user) {
      timer = setTimeout(() => {
        navigator(-1);
      }, 700);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [user, navigator]);

  return (
    <div className="mt-24 flex content-center justify-center">
      {loading === "pending"
        ? "Loading..."
        : loading === "failed"
        ? "Please Log in"
        : loading === "succeeded"
        ? "Success. Redirecting ..."
        : "Something wrong..."}
    </div>
  );
};

export default VerifyUser;
