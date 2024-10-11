# Completed Sale Form Backend

This repository contains the back-end code for handling form submissions from employees who report when they have landed a sale. The backend uses **Express.js**, **MongoDB**, and **Mongoose** to manage and store form data, ensuring valid submissions and employee verification.

## Features

- **Form Submission API**: Provides an API endpoint (`/api/forms`) to receive form data submitted by employees.
- **Data Storage**: Uses MongoDB to store form submissions, including business name, business description, website objective, employee ID, and timestamps.
- **Employee Validation**: Automatically checks if the employee ID is valid by comparing it to a list of pre-approved employee IDs stored in the database.
- **Automatic Cleanup**: Every 5 minutes, the backend checks for new form submissions and deletes any entries that have invalid employee IDs.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for handling API requests and responses.
- **MongoDB**: NoSQL database for storing form data and employee IDs.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **dotenv**: For environment variable management, especially database connection strings.
- **CORS**: Middleware for handling cross-origin resource sharing.
- **Body-Parser**: Middleware to parse incoming request bodies in JSON format.

## Repository Link

- [Backend Repository](https://github.com/NoahGrahamDev/brainwash-form-backend)

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/NoahGrahamDev/brainwash-form-backend.git
```

2. Install the required dependencies:

```bash
cd brainwash-form-backend
npm install
```

3. Set up your environment variables. Create a `.env` file in the root of the project and add the following:

```bash
DB_URI=<your-mongo-db-uri>
PORT=5000  # Or your preferred port number
```

4. Start the server:

```bash
npm start
```

By default, the server will run on `http://localhost:5000`.

## API Endpoints

- **POST /api/forms**: This endpoint receives form data submitted by employees, validates the data, and stores it in MongoDB. The expected fields in the request body are:
  - `businessName`: Name of the business.
  - `businessDescription`: A brief description of the business.
  - `websiteObjective`: The goal or objective of the website the employee sold.
  - `employeeID`: The ID of the employee who landed the sale.

  Example:

  ```json
  {
    "businessName": "ABC Corp",
    "businessDescription": "A tech solutions company",
    "websiteObjective": "Modernize user interface",
    "employeeID": "12345"
  }
  ```

  A valid submission will return a `201 Created` response with the saved form data.

## Employee ID Validation

The backend periodically checks new submissions for valid employee IDs. If a form contains an invalid employee ID, the entry is automatically deleted from the database.

- **ValidEmployeeID Model**: The `ValidEmployeeID` schema stores a list of valid employee IDs, ensuring that only authenticated employees' submissions are accepted.
- **Form Validation**: Every 5 minutes, the server checks for any form submissions from the last 5 minutes and deletes any that have invalid employee IDs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

If you have suggestions for new features or improvements, feel free to fork the repository and submit a pull request.

---

This backend is designed to securely manage form submissions, ensuring accurate sales tracking and employee validation!
