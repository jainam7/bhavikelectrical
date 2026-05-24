import { getGoogleReviews } from "../backend/services/googleReviewsService.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
    return;
  }

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
}
