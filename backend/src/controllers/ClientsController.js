const clientsController = {};
import clientsModel from "../models/client.js";

clientsController.getclient = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

clientsController.createclient = async (req, res) => {
  const { name, mail, password, phone, address, active } = req.body;
  const newclients = new clientsModel({ name, mail, password, phone, address, active });
  await newclients.save();
  res.json({ message: "client save" });
};

clientsController.deleteclient = async (req, res) => {
const deletedclients = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedclients) {
    return res.status(404).json({ message: "client dont find" });
  }
  res.json({ message: "client deleted" });
};

clientsController.updateclient = async (req, res) => {
  const { name, mail, password, phone, address, active } = req.body;
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, 
      mail, 
      password, 
      phone, 
      address, 
      active
    },
    { new: true }
  );
  res.json({ message: "client update" });
};

export default clientsController;
