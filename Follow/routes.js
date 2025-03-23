import * as dao from "./dao.js";

export default function FollowRoutes(app) {
  const createFollow = async (req, res) => {
    const follow = await dao.createFollow(req.body);
    const newFollow = await dao.findFollowsById(follow._id);
    res.json(newFollow);
  };

  const deleteFollow = async (req, res) => {
    const status = await dao.deleteFollow(req.params.followId);
    res.json(status);
  };

  const findFollowsById = async (req, res) => {
    const follow = await dao.findFollowsById(req.params.followId);
    res.json(follow);
  };

  const findFollowsByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const follows = await dao.findFollowsByUserId(userId);
    res.json(follows);
  };

  const updateFollow = async (req, res) => {
    const { followId } = req.params;
    const status = await dao.updateFollow(followId, req.body);
    const currentFollowStatus = await dao.findFollowsById(followId);
    res.json(status);
  };
  

  app.post("/api/follows", createFollow);
  app.get("/api/follows/:followId", findFollowsById);
  app.put("/api/follows/:followId", updateFollow);
  app.delete("/api/follows/:followId", deleteFollow);
  app.get("/api/follows/user/:userId", findFollowsByUserId);
 
};