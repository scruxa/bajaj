import express from "express";
import cors from "cors";

const app = express();

// Use CORS middleware with options
app.use(
  cors({
    origin: "*", // Allow all origins for testing; replace with specific origins for production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Define your API route
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

export default app;
