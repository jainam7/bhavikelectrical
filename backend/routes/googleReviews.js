import { Router } from "express";
import { getGoogleReviews } from "../services/googleReviewsService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === "true";
    const data = await getGoogleReviews({ forceRefresh });

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load Google reviews right now",
    });
  }
});

export default router;
