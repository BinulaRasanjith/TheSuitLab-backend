import { Router } from "express";

import {
    createReview,
    deleteReview,
    getReviews,
} from "../controllers/reviewController.js";

const reviewRoutes = Router();

// /api/review
reviewRoutes.get("/", getReviews);
reviewRoutes.post("/", createReview);
reviewRoutes.delete("/:id", deleteReview);

export default reviewRoutes;