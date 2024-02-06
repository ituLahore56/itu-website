import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { UpVote, DownVote } from "../assets/logos";
import {
  getDataForAboutPage,
  addComment,
  upVote,
  downVote,
} from "../../apiEndpoints";

const AboutPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getData = async () => {
    const response = await getDataForAboutPage(id);
    setData(response);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const allowRequest = () => {
    const currentTime = new Date().getTime();
    const lastVote = localStorage.getItem("lastVoteTime");

    if (!lastVote || currentTime - parseInt(lastVote) >= 300000) {
      localStorage.setItem("lastVoteTime", currentTime);
      return true;
    } else {
      toast.error("You can only send request once every 5 minutes.");
      return false;
    }
  };

  const handelUpVote = (id) => {
    if (allowRequest()) {
      const response = upVote(id);
      if (response) {
        getData();
      }
    }
  };

  const handelDownVote = (id) => {
    if (allowRequest()) {
      const response = downVote(id);
      if (response) {
        getData();
      }
    }
  };

  const handelAddComment = (event) => {
    event.preventDefault();
    if (allowRequest()) {
      const response = addComment(id, event.target[0].value);
      if (response) {
        getData();
      }
    }
    event.target[0].value = "";
  };

  return (
    <div className=" m-10">
      <div className="flex flex-col lg:flex-row" >
        <img className="w-[40rem]" src={data?.image} alt="img" />
        <div className=" lg:mx-5">
          <h1 className="text-3xl lg:text-6xl my-6">{data?.name}</h1>
          <p>{data?.about}</p>
        </div>
      </div>
      <div>
        <h1 className="text-2xl lg:text-4xl my-6">Comments</h1>
        <span className="text-gray-500">
          Disclamer :
          </span>
        <p>The comments are completely anonymous, even to the admin. Let's maintain a positive and respectful environment by avoiding hateful and spammy comments.</p>
        {/* // add comments */}
        <form
          className="w-full flex justify-center items-center m-2"
          onSubmit={handelAddComment}
        >
          <input
            type="text"
            placeholder="Add Comment"
            className=" w-full h-12 p-2 rounded-lg border-2 border-gray-300"
          />
          <button
            className="w-32 h-12 bg-blue-500 font-bold text-lg text-white p-2 rounded-lg ml-2"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="flex flex-col">
          {data?.comments?.map(({ _id, comment, upVotes, downVotes }) => (
            <div
              key={_id}
              className="bg-gray-100 my-2 p-2 text-lg rounded-lg flex flex-col lg:flex-row justify-between"
            >
              <p>{comment}</p>
              <div className="flex w-28 ml-2 bg-gray-300 rounded-3xl p-1 ">
                <button
                  className="flex items-center mx-1"
                  onClick={() => handelUpVote(_id)}
                >
                  <UpVote />
                  <span>{upVotes}</span>
                </button>
                <button
                  className="flex items-center mx-1 ml-2"
                  onClick={() => handelDownVote(_id)}
                >
                  <DownVote />
                  <span>{downVotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
