import Contact from "../models/contact.model.js";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id });
  res.json(contacts);
};

export const addContact = async (req, res) => {
  const contact = await Contact.create({ ...req.body, owner: req.user._id });
  res.status(201).json(contact);
};
