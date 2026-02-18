import express from "express";
import { generateDescription } from "../services/aiServices.js";

const router = express.Router();

// @desc   Generate AI description
// @route  POST /api/ai/generate-description
router.post("/generate-description", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const description = await generateDescription(name);

    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
