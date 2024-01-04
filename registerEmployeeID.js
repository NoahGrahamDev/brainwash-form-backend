const mongoose = require('mongoose');
const readline = require('readline');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema for ValidEmployeeID
const EmployeeIDSchema = new mongoose.Schema({
  employeeID: String
});
const ValidEmployeeID = mongoose.model('ValidEmployeeID', EmployeeIDSchema);

// Readline interface for command line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to add a new valid employee ID
function addEmployeeID() {
  rl.question('Enter a valid employee ID (or type "exit" to quit): ', async (id) => {
    if (id.toLowerCase() === 'exit') {
      console.log('Exiting program.');
      mongoose.disconnect();
      rl.close();
    } else {
      try {
        const newValidID = new ValidEmployeeID({ employeeID: id });
        await newValidID.save();
        console.log(`Employee ID ${id} added successfully.`);
        addEmployeeID(); // Prompt for another ID
      } catch (error) {
        console.error('Error saving employee ID:', error);
        addEmployeeID(); // Prompt again in case of error
      }
    }
  });
}

// Start the process
addEmployeeID();
