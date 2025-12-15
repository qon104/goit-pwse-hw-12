import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getContacts, addContact } from "../controllers/contacts.controller.js";

const router = express.Router();
router.get("/", auth, getContacts);
router.post("/", auth, addContact);

export default router;
