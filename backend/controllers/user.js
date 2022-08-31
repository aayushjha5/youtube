import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";


export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            //sending upadted user
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }
    else {
        return next(createError(403, "You can update only your account!"));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            //sending deleted user
            res.status(200).json("User has been deleted!");
        } catch (err) {
            next(err);
        }
    }
    else {
        return next(createError(403, "You can delete only your account!"));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export const sub = async (req, res, next) => {
    try {
        //push to be sub channel id to subUser part of current user DB
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        //update subscriber count of current user by 1
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        // send update
        res.status(200).json("subscription successful!");
    } catch (err) {
        next(err)
    }
}

export const unSub = async (req, res, next) => {
    try {
        //pull the   sub channel id from subUser part of current user DB
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        //update subscriber count of current user by 1
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        // send update
        res.status(200).json("unsubscription successful!");
    } catch (err) {
        next(err)
    }
}

export const like = async (req, res, next) => {
const id = req.user.id;
const videoId = req.params.videoId;

try {
    await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
    });
    res.status(200).json("Video has been liked!");
} catch (err) {
    next(err)
}
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        });
        res.status(200).json("Video has been disliked!");
    } catch (err) {
        next(err)
    }
}