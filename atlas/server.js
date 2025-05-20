import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Required for making API requests in Node.js
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors()); // Allow all origins
app.use(helmet()); // Set security-related HTTP headers
app.use(express.json()); // Parse JSON requests

app.get("/api/getUsers", async (req, res) => {
  try {
    const clerkSecretKey = process.env.VITE_CLERK_SECRET_KEY;

    if (!clerkSecretKey) {
      return res.status(500).json({ error: "Clerk Secret Key is missing" });
    }

    const response = await fetch("https://api.clerk.dev/v1/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${clerkSecretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Error fetching users: ${response.statusText}` });
    }

    const users = await response.json();
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.delete("/api/deleteUser/:id", async (req, res) => {
    const userId = req.params.id;
    console.log("Backend received delete request for user:", userId);
  
    const clerkSecretKey = process.env.VITE_CLERK_SECRET_KEY;

    if (!clerkSecretKey) {
      return res.status(500).json({ error: "Clerk Secret Key is missing" });
    }
  
    try {
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${clerkSecretKey}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Get the error message
        return res.status(response.status).json({ error: `Failed to delete user: ${errorResponse.error}` });
      }
  
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.patch('/api/changeUserRole/:id', async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body; // Ensure this is coming in as expected

    if (!role) {
        return res.status(400).json({ error: "Role is required" });
    }

    try {
        const clerkSecretKey = process.env.VITE_CLERK_SECRET_KEY;
        const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${clerkSecretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_metadata: { role } }), // Update the role as public_metadata or however it's structured in Clerk
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to update role: ${response.statusText}` });
        }

        const updatedUser = await response.json();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error changing user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  // Count active users (who logged in in the last 30 days)
app.get("/api/getActiveUsers", async (req, res) => {
  try {
    const clerkSecretKey = process.env.VITE_CLERK_SECRET_KEY;

    if (!clerkSecretKey) {
      return res.status(500).json({ error: "Clerk Secret Key is missing" });
    }

    const response = await fetch("https://api.clerk.dev/v1/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${clerkSecretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Error fetching users: ${response.statusText}` });
    }

    const users = await response.json();
    const activeUsersCount = users.filter(user => {
      const lastSignIn = new Date(user.last_sign_in_at);
      return lastSignIn >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Check if signed in within the last 30 days
    }).length;

    res.status(200).json({ count: activeUsersCount });
  } catch (error) {
    console.error("Failed to fetch active users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  
