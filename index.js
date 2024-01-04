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
  employeeID: String
});
const Form = mongoose.model('Form', FormSchema);


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
