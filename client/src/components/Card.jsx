import { useNavigate } from "react-router-dom";

const Card = ({ id, name, image }) => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate(`/about/${id}`);
  };
  return (
    <div
      className=" relative m-2 w-96 h-96 rounded-2xl group p-2"
      onClick={handelClick}
    >
      <img
        className=" w-full h-[23rem] overflow-hidden rounded-2xl"
        src={image}
        alt={"img"}
      />
      <div className="opacity-0 group-hover:opacity-100 transition">
        <span className=" absolute inset-0 bg-black rounded-2xl opacity-50"></span>
        <h2 className=" flex justify-center items-center absolute inset-0 text-2xl text-white">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default Card;
