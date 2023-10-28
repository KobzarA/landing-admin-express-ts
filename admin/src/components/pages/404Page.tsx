import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigator = useNavigate();
  return (
    <>
      <h1>Ooops, page not found</h1>
      <div className="mx-auto my-5 flex space-x-3">
        <button onClick={() => navigator(-1)}>Go back</button>
        <button onClick={() => navigator("/admin")}>Go to Main page</button>
      </div>
    </>
  );
};

export default PageNotFound;
