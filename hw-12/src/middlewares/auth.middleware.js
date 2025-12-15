import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
