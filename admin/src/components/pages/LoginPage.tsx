import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { API_BASE } from "../../config";
import { IUser } from "../App";
import { checkAuth } from "../../libs/auth";

const LoginPage = ({
  user,
  setUser,
}: {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<null | IUser>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await axios.post(
      `${API_BASE}admin/login/password`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    if (res.status === 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    checkAuth(setUser);
  }, []);

  return (
    <div className="m-6 flex min-h-screen flex-col justify-center space-y-10 rounded-2xl shadow-2xl md:m-0 md:flex-row  md:space-y-0">
      {user && <Navigate to=".." replace={true} />}
      {/* <!-- Content Container --> */}
      <form className="p-6 md:p-10" onSubmit={onSubmit}>
        <h2 className="mb-5 font-mono text-4xl font-bold">Log in</h2>
        <p className="mb-12 max-w-sm font-sans font-light text-gray-600">
          Log in to your account to upload or download pictures, videos or
          music.
        </p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="mb-6 w-full rounded-md  border border-gray-300 p-6 placeholder:font-sans placeholder:font-light "
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mb-6 w-full rounded-md  border border-gray-300 p-6 placeholder:font-sans placeholder:font-light "
        />
        {/* <!-- Middle Contant --> */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <button className="font-sans font-light text-cyan-200">
            Forgot password?
          </button>
          <button className="flex w-full items-center justify-center space-x-4 rounded-lg bg-cyan-500 p-6 px-8 font-sans font-bold text-white md:w-auto">
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="13" y1="18" x2="19" y2="12" />
              <line x1="13" y1="6" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        {/* <!-- Border --> */}
        <div className="mt-12 border-b border-b-gray-300"></div>
        {/* <!-- Bottom contant --> */}
        <div className="py-6 text-center text-sm font-thin text-gray-400">
          Or log in with
        </div>
        <div className="flex flex-col items-center justify-between space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
          <button className="flex w-full  items-center  justify-center space-x-3 rounded-md border px-6 py-2 md:w-1/2">
            <img className="w-9" src="images/facebook.png" alt="" />
            <span className="font-thin">Facebook</span>
          </button>
          <button className="flex w-full  items-center  justify-center space-x-3 rounded-md border px-6 py-2 md:w-1/2">
            <img className="w-9" src="images/google.png" alt="" />
            <span className="font-thin">Google</span>
          </button>
        </div>
      </form>
      {/* <!-- Image container --> */}
      {/* <div className="hidden md:block ">
        <img src="images/image.jpg" alt="" className="w-[430px]" />
      </div> */}
    </div>
  );
};

export default LoginPage;
