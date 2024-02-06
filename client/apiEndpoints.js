import axios from "axios";

import { SERVER_URL } from "./constants";
import { toast } from "react-toastify";

export const getDataForHomePage = async () => {
  const response = await axios.get(`${SERVER_URL}/home`, {});
  return response.data;
};

export const getDataForAboutPage = async (id) => {
  const response = await axios.get(`${SERVER_URL}/about/${id}`);
  return response.data;
};

export const addComment = async (id, comment) => {
  try {
    const response = axios.post(`${SERVER_URL}/addComment/${id}`, {
      comment,
    });
    toast.success("Comment added");
  } catch (error) {
    toast.error("Error adding comment");
  }
};

export const upVote = async (id) => {
  try {
    const response = axios.post(`${SERVER_URL}/upVote/${id}`);
  } catch (error) {
    toast.error("Error upvoting");
  }
};

export const downVote = async (id) => {
  try {
    const response = axios.post(`${SERVER_URL}/downVote/${id}`);
  } catch (error) {
    toast.error("Error downvoting");
  }
};
