import { useParams } from "react-router-dom";
// import { useEffect } from "react";
const Category = () => {
  const param = useParams();

  //   useEffect(() => {
  //     console.log(param);
  //   }, []);
  return (
    <div>{param.categoryName === "categoryBuy" ? "Buy" : "Sell"} CATEGORY </div>
  );
};

export default Category;
