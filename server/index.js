import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import {
  getDataForHomePage,
  getDataForAboutPage,
  addComment,
  upVote,
  downVote,
} from "./controllers/database.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const requestHistory = {};

const checkRequestHistory = (req, res) => {
  const ip = req.ip;
  if (requestHistory[ip]) {
    const difference = new Date() - requestHistory[ip];
    if (difference < 300000) {
      res.status(429).send("Too many requests");
      return false;
    }
  }
  requestHistory[ip] = new Date();
  return true;
};

app.get("/home", async (req, res) => {
  getDataForHomePage()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.get("/about/:id", async (req, res) => {
  return getDataForAboutPage(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.post("/addComment/:id", async (req, res) => {
  if (!checkRequestHistory(req, res)) return;
  return addComment(req.params.id, req.body.comment)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.post("/upVote/:id", async (req, res) => {
  if (!checkRequestHistory(req, res)) return;
  return upVote(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.post("/downVote/:id", async (req, res) => {
  if (!checkRequestHistory(req, res)) return;
  return downVote(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
