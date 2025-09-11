import spinner from "../assets/gif/spinner.gif";

const Spinner = () => {
  return (
    <div className="loading">
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default Spinner;
