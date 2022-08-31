import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
//update a video
router.put("/:id", verifyToken, updateVideo)
//delete a video
router.delete("/:id", verifyToken, deleteVideo)
//get a video
router.get("/find/:id",  getVideo)
//view a video
router.put("/view/:id",  addView)
// get trend videos
router.get("/trend",  trend)
//get random videos
router.get("/random",  random)
//get subscribed channels
router.get("/sub",verifyToken,  sub)
//search by tag
router.get("/tags",  getByTag)
//search 
router.get("/search",  search)

export default router;