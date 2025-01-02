// Import necessary modules
import express from "express";
import axios from "axios";
// import { expect, test, describe } from "vitest";

// Create the Express application
const app = express();

// Use JSON middleware
app.use(express.json());

// In-memory storage for the data
const storage = [];

// /send route
app.post("/send", (req, res) => {
  try {
    const { id, name, age } = req.body;

    // Validate request body
    if (!id || !name || !age || typeof age !== "number") {
      return res.status(400).json({ error: "Missing id, name, or age" });
    }

    // Store data in the array
    storage.push({ id, name, age });
    return res.status(200).json({ message: "Data stored successfully" });

  } catch (error) {
    console.error("Error in /send route: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// /retrieve/:id route
app.get("/retrieve/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Find the item with the given id
    const data = storage.find((item) => item.id === id);

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in /retrieve/:id route: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PUBLIC_PORT || 1337;
const HOSTNAME = process.env.PUBLIC_HOSTNAME || "localhost";

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}`);
});


// Vitest Code: To write in a different file named 'index.test.js'
// // Tests using Vitest
// describe("Express.js Routes", () => {
//   const baseURL = `http://${HOSTNAME}:${PORT}`;

//   test("POST /json - Successful Request", async () => {
//     const response = await axios.post(`${baseURL}/json`, {
//       id: "1",
//       name: "Sid",
//       age: 22,
//     });

//     expect(response.status).toBe(200);
//     expect(response.data.message).toBe("Data stored successfully");
//   });

//   test("/POST /json - Missing Parameters", async () => {
//     try {
//       await axios.post(`${baseURL}/json`, { name: "Sid", age: 22 });
//     } catch (error) {
//       expect(error.response.status).toBe(400);
//       expect(error.response.data.error).toBe("Data not found");
//     }
//   });
// });
