import PersonModel from "../models/Person.js";
import CommentsModel from "../models/Comments.js";

export const getDataForHomePage = async () => {
  const data = await PersonModel.find();
  const newData = data.map(({ _id, name, image }) => {
    return { id: _id, name, image };
  });
  return newData;
};

export const getDataForAboutPage = async (id) => {
  const { _id, name, image, about } = await PersonModel.findById(id);
  const comments = await CommentsModel.find({ personId: id });
  return {
    id: _id,
    name,
    image,
    about,
    comments: comments.sort((a, b) => b.upVotes - a.upVotes),
  };
};

export const addComment = async (id, comment) => {
  return await CommentsModel.create({ personId: id, comment });
};

export const upVote = async (id) => {
  const comment = await CommentsModel.updateOne(
    { _id: id },
    { $inc: { upVotes: 1 } }
  );
  return comment;
};

export const downVote = async (id) => {
  const comment = await CommentsModel.updateOne(
    { _id: id },
    { $inc: { downVotes: 1 } }
  );
  return comment;
};
