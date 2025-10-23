const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// ✅ GET /api/form - Fetch all registrations
router.get("/", async (req, res) => {
  try {
    const records = await Registration.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching records" });
  }
});

// ✅ GET /api/form/:id - Fetch single record
router.get("/:id", async (req, res) => {
  try {
    const record = await Registration.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching record" });
  }
});

// ✅ POST /api/form - Create new record
router.post("/", async (req, res) => {
  try {
    const { sector, unit, name, className, school, age, fatherName, number } =
      req.body;

    if (!sector || !unit) {
      return res
        .status(400)
        .json({ message: "Division, Sector, and Unit are required" });
    }

    const newRecord = new Registration({
      sector,
      unit,
      name,
      className,
      school,
      age,
      fatherName,
      number,
    });

    await newRecord.save();
    res
      .status(201)
      .json({ message: "Record created successfully", record: newRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating record" });
  }
});

// ✅ PUT /api/form/:id - Update existing record
router.put("/:id", async (req, res) => {
  try {
    const record = await Registration.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    Object.assign(record, req.body);
    await record.save();

    res.json({ message: "Record updated successfully", record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating record" });
  }
});

// ✅ DELETE /api/form/:id - Delete record
router.delete("/:id", async (req, res) => {
  try {
    const record = await Registration.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    await record.deleteOne();
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting record" });
  }
});

module.exports = router;

