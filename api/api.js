const express = require("express");
const cors = require("cors");

const app = express();

// Use CORS middleware with default options (allow all origins)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define your API routes
app.post("/api/api", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      msg: "Invalid input data format",
    });
  }

  // API logic
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercaseAlphabet =
    alphabets
      .filter((item) => item >= "a" && item <= "z")
      .sort()
      .pop() || "";

  return res.status(200).json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

app.get("/api/api", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

// Export the app for modular use
module.exports = app;

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
