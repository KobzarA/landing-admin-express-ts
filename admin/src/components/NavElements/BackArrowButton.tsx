import { Link } from "react-router-dom";

const BackArrowButton = () => {
  return (
    <Link to={".."} relative="path">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="group h-6 w-6  hover:stroke-cyan-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          className="group-hover:stroke-cyan-300"
        />
      </svg>
    </Link>
  );
};

export default BackArrowButton;
