import { Navigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogIn } from "../../../api/authSlice";
import { AppDispatch, RootState } from "../../../store";
import useAnimationOnRemove from "../../../hooks/useAnimationOnRemove";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorDiv, closeErrorMessage] = useAnimationOnRemove();

  const {
    user: userRedux,
    error,
    loading,
  } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogIn({ username, password }));
  };

  const onForgotPassword = () => {
    setUsername("admin");
    setPassword("admin");
  };

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  return (
    <div className="m-6 flex min-h-screen flex-col justify-center space-y-10 rounded-2xl shadow-2xl md:m-0 md:flex-row  md:space-y-0">
      {userRedux && <Navigate to=".." replace={true} />}
      {/* <!-- Content Container --> */}
      <form className="p-6  md:p-10" onSubmit={onSubmit}>
        <h2 className="mb-5 font-mono text-4xl font-bold">Log in</h2>
        <p className="mb-12 max-w-sm font-sans font-light text-gray-600">
          <span className="font-mono text-xl">
            Log in to your account to access Custom Admin System.
          </span>{" "}
          <br />
          username - admin <br />
          password - admin
        </p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            closeErrorMessage<string | null>({
              setState: setErrorMessage,
              newState: null,
            });
          }}
          placeholder="Enter your username"
          className="mb-6 w-full rounded-md  border border-gray-300 p-6 placeholder:font-sans placeholder:font-light "
        />
        <div className=" relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              closeErrorMessage<string | null>({
                setState: setErrorMessage,
                newState: null,
              });
            }}
            placeholder="Enter your password"
            className="mb-6 w-full rounded-md  border border-gray-300 p-6 placeholder:font-sans placeholder:font-light "
          />
          {/* container for switching visibility of password */}
          <div
            className=" absolute  right-2 top-6 hover:text-cyan-300"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            ) : (
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Error message  */}
        {errorMessage ? (
          <div
            ref={errorDiv}
            className="mx-auto mb-8 mt-2 w-fit animate-fade-in  rounded-md bg-red-300  px-5  py-2 text-center text-red-700"
          >
            {errorMessage}
          </div>
        ) : null}

        {/* <!-- Middle Contant --> */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <button
            type="button"
            className="font-sans font-light text-cyan-200  hover:text-cyan-300"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
          <button
            type="submit"
            className="flex w-full items-center justify-center space-x-4 rounded-lg bg-cyan-500 p-6 px-8 font-sans font-bold text-white transition-all duration-500 hover:scale-110  md:w-auto"
            disabled={loading === "pending"}
          >
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
      </form>
      {/* <!-- Image container --> */}
      {/* <div className="hidden md:block ">
        <img src="images/image.jpg" alt="" className="w-[430px]" />
      </div> */}
    </div>
  );
};

export default LoginPage;

//  {/* <!-- Border --> */}
//       <div className="mt-12 border-b border-b-gray-300"></div>
//       {/* <!-- Bottom contant --> */}
//       <div className="py-6 text-center text-sm font-thin text-gray-400">
//         Or log in with
//       </div>
//       <div className="flex flex-col items-center justify-between space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
//         <button className="flex w-full  items-center  justify-center space-x-3 rounded-md border px-6 py-2 md:w-1/2">
//           <img className="w-9" src="images/facebook.png" alt="" />
//           <span className="font-thin">Facebook</span>
//         </button>
//         <button className="flex w-full  items-center  justify-center space-x-3 rounded-md border px-6 py-2 md:w-1/2">
//           <img className="w-9" src="images/google.png" alt="" />
//           <span className="font-thin">Google</span>
//         </button>
//       </div>
