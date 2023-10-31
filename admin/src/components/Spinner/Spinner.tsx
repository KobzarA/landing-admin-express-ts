import spinner from "./Spinner-1s-200px.svg";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center pt-24 xl:pt-40">
      <img src={spinner} alt="Spinner" />
    </div>
  );
};

export default Spinner;
