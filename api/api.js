import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST"],
  origin: "https://bfhl-frontend-5wtvhmdsa-scruxas-projects.vercel.app/", // Replace with your frontend URL
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
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

    res.status(200).json({
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
  } else if (req.method === "GET") {
    res.status(200).json({ operation_code: 1 });
  } else {
    res.status(405).json({ msg: "Method Not Allowed" });
  }
}
