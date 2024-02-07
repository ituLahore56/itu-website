import { useEffect } from "react";
import { useState } from "react";

import Card from "../components/Card";
import { getDataForHomePage } from "../../apiEndpoints";

const HomePage = () => {
  const [data, setData] = useState([]);
  const getDataForHome = async () => {
    const abc = await getDataForHomePage();
    console.log(abc);
    setData(abc);
  };
  useEffect(() => {
    getDataForHome();
  }, []);
  return (
    <div className="bg-gray-200">
      <div className="mx-2 lg:mx-10 flex flex-col">
        <h3 className=" text-4xl my-5 flex justify-center">Our Heros</h3>
        <div className="flex justify-center flex-wrap ">
          {data?.map(({ id, name, image }) => (
            <Card key={id} id={id} name={name} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
