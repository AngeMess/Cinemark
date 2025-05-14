const employeesController = {};
import employeesModel from "../models/employee.js";

employeesController.getemployee = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};

employeesController.createemployee = async (req, res) => {
  const { name, mail, password, phone, address, workstation, hiringdate, salary, active } = req.body;
  const newemployees = new employeesModel({ name, mail, password, phone, address, workstation, hiringdate, salary, active });
  await newemployees.save();
  res.json({ message: "employee save" });
};

employeesController.deleteemployee = async (req, res) => {
const deletedemployees = await employeesModel.findByIdAndDelete(req.params.id);
  if (!deletedemployees) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

employeesController.updateemployee = async (req, res) => {
  const { name, mail, password, phone, address, workstation, hiringdate, salary, active } = req.body;
  await employeesModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
        mail, 
        password, 
        phone, 
        address, 
        workstation, 
        hiringdate, 
        salary, 
        active 
    },
    { new: true }
  );
  res.json({ message: "employee update" });
};

export default employeesController;