const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const FormSchema = new mongoose.Schema({
  businessName: String,
  businessDescription: String,
  websiteObjective: String,
  employeeID: String,
  createdAt: { type: Date, default: Date.now }  // Add a timestamp field
});
const Form = mongoose.model('Form', FormSchema);

// Schema for valid employee IDs
const EmployeeIDSchema = new mongoose.Schema({
  employeeID: String
});
const ValidEmployeeID = mongoose.model('ValidEmployeeID', EmployeeIDSchema);

app.post('/api/forms', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    const savedForm = await newForm.save();
    console.log('Form saved:', savedForm);
    res.status(201).send(savedForm);
  } catch (error) {
    console.error('Error in /api/forms:', error);
    res.status(500).send(error);
  }
});

// Function to check new records against valid employee IDs
async function checkNewRecords() {
  try {
    const fiveMinutesAgo = new Date(new Date() - 5 * 60000);
    const newForms = await Form.find({ createdAt: { $gte: fiveMinutesAgo } });

    for (const form of newForms) {
      const isValidEmployee = await ValidEmployeeID.findOne({ employeeID: form.employeeID });
      if (!isValidEmployee) {
        console.log(`Invalid employee ID found and deleting entry: ${form.employeeID}`);
        // Delete the form with the invalid employee ID
        await Form.findByIdAndDelete(form._id);
      }
    }
  } catch (error) {
    console.error('Error in checking new records:', error);
  }
}

// Run the check function every 5 minutes
setInterval(checkNewRecords, 5 * 60000);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
