import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";
import Url from "./model/url.model.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite dev server for local development
    "https://url-shortener-nu-ashen.vercel.app" // Live frontend deployment
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("Hare Krishna");
});

// Move this route to the end, after all specific routes
app.get("/:shortId", async (req, res) => {
  try {
    const entry = await Url.findOneAndUpdate(
      {
        shortId: req.params.shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error"); 
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
