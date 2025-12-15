import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokens } from "../services/jwt.service.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });

  res.status(201).json({ id: user._id, email: user.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const tokens = generateTokens({ id: user._id });
  user.refreshToken = tokens.refreshToken;
  await user.save();

  res.json(tokens);
};
